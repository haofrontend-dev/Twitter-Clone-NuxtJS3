import UrlPattern from "url-pattern";
import { decoreAccessToken } from "../utils/jwt";
import { getUserById } from "../db/users";

export default defineEventHandler(async (event) => {
    const endpoints = ["/api/auth/user"];

    const isHandledByThisMiddleware = endpoints.some((endpoint) => {
        const url = event.req.url;
        if (url) {
            const pattern = new UrlPattern(endpoint);
            return pattern.match(url);
        }
        return false; // Handle the case where event.web or event.web.url is undefined
    });

    if (!isHandledByThisMiddleware) {
        return;
    }

    const token = event.headers.get("authorization")?.split(" ")[1];
    const decored = decoreAccessToken(token);

    if (!decored) {
        return sendError(
            event,
            createError({
                statusMessage: "Unauthorized",
                statusCode: 401,
            })
        );
    }

    try {
        const userId = decored.userId;
        const user = await getUserById(userId);

        event.context.auth = { user };
    } catch (error) {
        return;
    }
    // Rest of your code
});
