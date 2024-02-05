import { prisma } from "./prisma-client"
import { hashPassword } from "../utils/bcrypt";
import { users } from "../users.json";
import { UserRole } from "@prisma/client";

async function main() {
    const saEmail = process.env.SA_EMAIL;
    const saPassword = process.env.SA_PASSWORD;

    if (!saEmail || !saPassword) {
        throw new Error("SysAdmin user data is not sed");
    }

    const hashedPassword = await hashPassword(saPassword);

    const sysAdmin = await prisma.user.upsert({
        where: {
            email: saEmail
        },
        update: {},
        create: {
            email: saEmail,
            role: "SysAdmin",
            hashedPassword: hashedPassword,
            pob: {
                create: {
                    locality: "",
                    region: ""
                },
            },
        },
    });

    users.forEach(async user => {
        const newUser = await prisma.user.upsert({
            where: {
                email: user.email
            },
            update: {},
            create: {
                email: user.email,
                hashedPassword: user.hashedPassword,
                name: user.name,
                role: UserRole[user.role as keyof typeof UserRole],
                pob: {
                    create: {
                        locality: user.pob.locality,
                        region: user.pob.region
                    }
                }
            }
        });

        if (newUser) {
            console.log(`User ${newUser.email} created`);
        } else {
            console.log(`Could not create ${user.email} user`);
        }
    });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })