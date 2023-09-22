import { prisma } from ".";

export const createRefreshToken = (refreshToken: string) => {
    return prisma.refreshToken.create({
        data: refreshToken,
    });
};
