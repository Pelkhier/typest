import db from "$lib/server/database";
import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Lang } from "$lib/components/keyboard/types";
import { loader } from "$lib/store/global";
import type { GameType } from "$lib/components/game/types";

export const load: PageServerLoad = async ({ url, params, locals }) => {
    const order = Number(url.searchParams.get("order"));
    const lang: Lang = locals.lang ?? "en";
    if (isNaN(order)) {
        // TODO: this should redirect to not found page or error page
        // TODO: redirect status (303) should be reviewed
        throw redirect(303, `/${params.lang}/levels`);
    }

    const level = await db.userLevel.findFirst({
        where: {
            userId: locals?.user?.id,
            level: {
                order,
                lang,
            },
        },
        select: {
            levelId: true,
            userId: true,
            level: {
                select: {
                    lang: true,
                    name: true,
                    order: true,
                    type: true,
                    words: true,
                    expectedMiniGameScore: true,
                },
            },
            user: {
                select: {
                    miniGameSound: true,
                },
            },
            completed: true,
            accuracy: true,
            time: true,
        },
    });
    if (!level) {
        // TODO : this should redirect to not found or error page
        throw redirect(303, `/${params.lang}/levels`);
    }
    const nextGame = await db.userLevel.findFirst({
        where: {
            userId: locals.user?.id,
            level: {
                order: order + 1,
                lang,
            },
        },
        select: {
            level: {
                select: {
                    type: true,
                },
            },
        },
    });

    const nextLevelType: GameType | undefined = nextGame?.level.type as
        | GameType
        | undefined;

    return { game: level, nextLevelType };
};

export const actions: Actions = {
    toggleSounds: async ({ request, locals }) => {
        const data = await request.json();
        await db.user.update({
            where: {
                id: locals.user?.id,
            },
            data: {
                miniGameSound: !data.mute,
            },
        });
    },
};
