import bcrypt from "bcrypt";
import { getUserByUsername } from "~/server/db/users";
import { userTransformer } from "~/server/transformers/user";
import { generateTokens, senRefreshToken } from "~/server/utils/jwt";
import { createRefreshToken } from "~/server/db/refreshToken";
export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { username, password } = body;

    if (!username && !password) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Ivaild parameters required",
            })
        );
    }

    // Is the user registered
    const user = await getUserByUsername(username);

    if (!user) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Username or password is valid",
            })
        );
    }
    // Compare passwords
    const doesThePasswordMatch = await bcrypt.compare(password, user.password);
    if (!doesThePasswordMatch) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Username or password is valid",
            })
        );
    }
    // Generate Tokens
    // Access Token
    // Refresh Token

    const { accessToken, refreshToken } = generateTokens(user);

    // Save it inside db
    await createRefreshToken({
        token: refreshToken,
        userId: user.id,
    });

    // Add http only cookie
    senRefreshToken(event, refreshToken);
    return {
        access_token: accessToken,
        user: userTransformer(user),
    };
});
