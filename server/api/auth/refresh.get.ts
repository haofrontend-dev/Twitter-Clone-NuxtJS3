import { getUserById, getUserByUsername } from "./../../db/users";
import { getRefreshTokenByToken } from "~/server/db/refreshToken";
import { decoreRefreshToken } from "~/server/utils/jwt";

export default defineEventHandler(async (event) => {
    const cookies = parseCookies(event);
    const refreshToken = cookies.refresh_token;

    if (!refreshToken) {
        return sendError(
            event,
            createError({
                message: "Refresh token is invalid",
                statusCode: 401,
            })
        );
    }

    const rToken = await getRefreshTokenByToken(refreshToken);
    if (!rToken) {
        return sendError(
            event,
            createError({
                message: "Refresh token is invalid",
                statusCode: 401,
            })
        );
    }

    const decoreToken = decoreRefreshToken(refreshToken);

    try {
        const user = await getUserById(decoreToken.userId);
        const { accessToken } = generateTokens(user);
        return { access_token: accessToken };
    } catch (error) {
        return sendError(
            event,
            createError({
                message: "Something went wrong",
                statusCode: 500,
            })
        );
    }

    return {
        hello: decoreToken,
    };
});
