import bcrypt from "bcrypt";
import { getUserByUsername } from "~/server/db/users";
import { userTransformer } from "~/server/transformers/user";
import { generateTokens } from "~/server/utils/jwt";

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

    // Generate Tokens
    // Access Token
    // Refresh Token

    const { accessToken, refreshToken } = generateTokens(user);
    return {
        access_token: accessToken,
        user: userTransformer(user),
    };
});
