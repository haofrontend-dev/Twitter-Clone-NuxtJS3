import { sendError } from "h3";
import { createUser } from "~/server/db/users";
import { userTransformer } from "~/server/transformers/user";
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { username, email, password, confirmPassword, name } = body;

    if (!username || !email || !password || !confirmPassword || !name) {
        return sendError(
            event,
            createError({ statusCode: 400, statusMessage: "Invalid params" })
        );
    }

    if (password !== confirmPassword) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Password do not match",
            })
        );
    }
    const userData = {
        username,
        email,
        password,
        name,
    };
    const user = await createUser(userData);

    return {
        body: userTransformer(user),
    };
});
