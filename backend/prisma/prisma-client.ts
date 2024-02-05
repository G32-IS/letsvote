import { PrismaClient, UserRole } from '@prisma/client'
import { hashPassword } from '../utils/bcrypt';
import { users } from "../users.json"

export const prisma = new PrismaClient();

export const setupPrisma = async () => {
    console.log("Setting up prisma...");

    // Create admin user
    const sysAdmin = await prisma.user.findFirst({
        where: {
            role: UserRole.SysAdmin
        }
    });

    if (!sysAdmin) {
        const email = process.env.SA_EMAIL;
        const password = process.env.SA_PASSWORD;

        if (!email || !password) {
            throw new Error("SysAdmin user data is not set");
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                email: email,
                hashedPassword: hashedPassword,
                role: UserRole.SysAdmin,
                pob: {
                    create: {
                        region: "MI",
                        locality: "F205"
                    }
                }
            },
        });

        if (!newUser) {
            throw new Error(`Could not create SysAdmin ${email}`);
        }
    }

    // Create test users
    users.forEach(async user => {
        const oldUser = await prisma.user.findUnique({
            where: {
                email: user.email
            }
        });

        if (!oldUser) {
            const oldPob = await prisma.placeOfBirth.findFirst({
                where: user.pob.create
            });

            let newUser;
            if (oldPob) {
                newUser = await prisma.user.create({
                    data: {
                        email: user.email,
                        hashedPassword: user.hashedPassword,
                        name: user.name,
                        role: UserRole[user.role as keyof typeof UserRole],
                        pobId: oldPob.id
                    }
                });
            } else {
                newUser = await prisma.user.create({
                    data: {
                        email: user.email,
                        hashedPassword: user.hashedPassword,
                        name: user.name,
                        role: UserRole[user.role as keyof typeof UserRole],
                        pob: user.pob
                    }
                })
            }

            if (!newUser) {
                throw new Error(`Could not create user ${user.email}`);
            }
        }
    });
};