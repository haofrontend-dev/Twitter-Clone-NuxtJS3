import { prisma } from ".";
import bcrypt from "bcrypt";

interface UserData {
    username: string;
    email: string;
    password: string;
    name: string;
}
export const createUser = (userData: UserData) => {
    const finalUserData = {
        ...userData,
        password: bcrypt.hashSync(userData.password, 10),
    };
    return prisma.user.create({
        data: finalUserData,
    });
};

export const getUserByUsername = (username: string) => {
    return prisma.user.findUnique({
        where: {
            username: username,
        },
    });
};
