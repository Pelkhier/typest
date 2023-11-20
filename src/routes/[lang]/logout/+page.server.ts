import type { PageServerLoad } from "../add-level/$types";

export const load: PageServerLoad = async ({ cookies, locals }) => {
    cookies.delete("authToken", { path: "/" });
    locals.user = null;

    return {};
};
