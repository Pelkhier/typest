import db from "$lib/server/database";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();

    await db.user.update({
        where: {
            id: data.userId,
        },
        data: data.settings,
    });
    return new Response();
};
