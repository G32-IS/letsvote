import { Prisma, PrismaClient, UserRole } from '@prisma/client'
import { hashPassword } from '../utils/bcrypt';

export const prisma = new PrismaClient();

export const prismaSetup = async () => {
    // await prisma.user.findFirst({
    //     where: {
    //         role: UserRole.SysAdmin
    //     }
    // });
    // // Insert 
    // const password = process.env.ADMIN_PASSWORD;
    // if (!password) {
    //     throw new Error("Admin password is not set");
    // }
    // const hashedPassword = hashPassword();
    // const adminData = {
    //     email: process.env.ADMIN_EMAIL,
    // }
    // prisma.user.upsert({
    //     where: {
    //         role: UserRole.SysAdmin
    //     },
    //     create: {
    //         role: UserRole.SysAdmin
    //     }
    // });
}