import type { Lang } from "$lib/components/keyboard/types";
import db from "$lib/server/database";
import { error, redirect, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();

    const userId = Number(data.userId);
    const levelId = Number(data.levelId);
    const accuracy = Number(data?.accuracy);
    const wpm = Number(data?.wpm);
    const time = Number(data?.time);

    if (isNaN(levelId)) {
        throw error(404, { message: "This is not a level" });
    }

    let result;
    if (isNaN(wpm) && isNaN(time) && isNaN(accuracy)) {
        result = await db.userLevel.update({
            where: {
                userId_levelId: {
                    levelId,
                    userId,
                },
            },
            data: {
                completed: true,
            },
        });
    } else {
        result = await db.userLevel.update({
            where: {
                userId_levelId: {
                    levelId,
                    userId,
                },
            },
            data: {
                completed: true,
                accuracy,
                time,
                wpm,
            },
        });
    }

    return new Response();
};
