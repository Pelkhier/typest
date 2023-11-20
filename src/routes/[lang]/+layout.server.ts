import type { Lang } from "$lib/components/keyboard/types";
import { langStore } from "$lib/store/global";

import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
    let lang: Lang | undefined = cookies.get("lang") as Lang;
    if (!lang) {
        cookies.set("lang", "en", {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30,
            sameSite: "strict",
        });
        lang = "en";
    }
    // TODO: consider using $page store for the language instead of custom store "langStore"
    langStore.set(lang);
    return { user: locals?.user, lang };
};
