import db from "$lib/server/database";
import type { PageServerLoad } from "./$types";
import type { Lang } from "$lib/components/keyboard/types";
export const load: PageServerLoad = async ({ locals }) => {
    let lang: Lang = locals.lang ?? "en";
    const userLevels = await db.userLevel.findMany({
        where: {
            userId: locals?.user?.id,
            level: {
                lang: lang,
            },
        },
        orderBy: {
            level: {
                order: "asc",
            },
        },
        select: {
            wpm: true,
            accuracy: true,
            time: true,
            completed: true,
            level: {
                select: {
                    id: true,
                    name: true,
                    lang: true,
                    order: true,
                    type: true,
                    expectedMiniGameScore: true,
                },
            },
        },
    });

    return { userLevels };
};
