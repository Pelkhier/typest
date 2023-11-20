import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getGithubUsers } from "$lib/server/git-access";
import { getUserStats } from "$lib/server/utils";
import type { Lang } from "$lib/components/keyboard/types";
import db from "$lib/server/database";

export const load: PageServerLoad = async ({ locals }) => {
    let githubUsers = await getGithubUsers();
    let userStats = null;
    if (locals.user?.id) {
        userStats = await getUserStats(locals.user.id, locals.lang as Lang);
    }
    return { githubUsers, userStats };
};

export const actions: Actions = {
    // NOTE : this action is used by the +layout.svelte language option, not by +page.svelte
    changeLang: async ({ cookies, request }) => {
        const data = await request.formData();
        const lang = data.get("lang")?.toString();
        if (!lang) return fail(500, { message: "something went wrong!" });

        cookies.set("lang", lang);
        throw redirect(303, `/${lang}`);
    },

    getRandomStory: async ({ locals }) => {
        const lang: Lang = locals.lang ?? "en";
        const userId = locals.user?.id;
        if (!userId) throw redirect(303, `/${lang}/login`);

        const storyLevels = await db.userLevel.findMany({
            where: {
                userId,
                level: {
                    lang,
                    type: "story-time",
                },
            },
            select: {
                level: {
                    select: {
                        order: true,
                    },
                },
            },
        });

        const randomIndex = Math.floor(Math.random() * storyLevels.length);
        const randomLevel = storyLevels[randomIndex];

        throw redirect(
            303,
            `/${lang}/levels/game?order=${randomLevel.level.order}`
        );
    },
};
