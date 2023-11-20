import { redirect, type Handle } from "@sveltejs/kit";
// @ts-ignore
import { env } from "$env/dynamic/private";
import { validateUserToken, verifyJWT } from "$lib/server/utils";
import type { UserToken } from "$lib/server/utils/types";
import type { Lang } from "$lib/components/keyboard/types";
import { langStore } from "$lib/store/global";

const protectedRoutesIfNotUser = ["/levels"];
const protectedRoutesIfUser = ["/signin", "/login"];

function isProtectedRoute(path: string, protectedRoutes: string[]): Boolean {
    let prefix = path.slice(3);
    for (let route of protectedRoutes) {
        return prefix.startsWith(route);
    }
    return false;
}

export const handle: Handle = async ({ resolve, event }) => {
    // TODO: some routes should be protected such as levels
    const authToken = event.cookies.get("authToken");
    let lang = event.cookies.get("lang") as Lang;

    if (!lang) {
        event.cookies.set("lang", "en", {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30,
            sameSite: "strict",
        });
        lang = "en";
    }
    langStore.set(lang);
    event.locals.lang = lang;
    let token: string = "";
    let verifyError = null;
    try {
        if (authToken) {
            const { sub } = await verifyJWT<{ sub: string }>(
                authToken,
                env.JWT_SECRET
            );
            token = sub;
        } else {
            // console.log("User auth token does not exist !");
        }
    } catch (error) {
        event.cookies.delete("authToken");
        console.log(error);
        verifyError = error;
    }

    if (verifyError) {
        throw redirect(303, `/${lang}/login`);
    }
    let user = null;
    try {
        const userToken = JSON.parse(token) as UserToken;

        user = await validateUserToken(userToken);
        if (!user) {
            event.cookies.delete("authToken");
            throw redirect(303, `/${lang}/login`);
        }

        event.locals.user = user;
    } finally {
        if (
            !user &&
            isProtectedRoute(event.url.pathname, protectedRoutesIfNotUser)
        ) {
            throw redirect(303, `/${lang}/signin`);
        } else if (
            user &&
            isProtectedRoute(event.url.pathname, protectedRoutesIfUser)
        ) {
            throw redirect(303, `/${lang}/`);
        }

        const response = await resolve(event);
        return response;
    }
};
