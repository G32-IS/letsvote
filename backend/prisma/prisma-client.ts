import { Prisma, PrismaClient, UserRole } from '@prisma/client'
import { hashPassword } from '../utils/bcrypt';

export const prisma = new PrismaClient();

export const setupPrisma = async () => {
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
        const adminData = {
            email: email,
            hashedPassword: hashedPassword,
            role: UserRole.SysAdmin
        };

        const newSysAdmin = await prisma.user.create({
            data: adminData
        })

        if (!newSysAdmin) {
            throw new Error("Could not create SysAdmin user");
        }
    }
}