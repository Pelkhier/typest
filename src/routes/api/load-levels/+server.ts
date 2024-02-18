import type { Lang } from "$lib/components/keyboard/types";
import db from "$lib/server/database";
import { fail, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals }) => {
    const count = Number(url.searchParams.get("count"));
    if (isNaN(count) || !count) throw Error("Not found");

    const lang: Lang = locals.lang ?? "en";

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
        take: 18,
        skip: count,
    });

    return json(userLevels);
};
