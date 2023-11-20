import db from "$lib/server/database";
import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    addLevel: async ({ request, url, locals }) => {
        // TODO : the form data should be validated properly ( for other developers to not make mistakes inserting unvalid data into the data base )

        const data = await request.formData();
        const name = String(data.get("name"));
        const order = Number(data.get("order"));
        const lang = String(data.get("lang"));
        const type = String(data.get("type"));
        const samuraiExpectedScore = data.get("expected-score")
            ? Number(data.get("expected-score"))
            : null;

        const words = String(data.get("words"));
        const level = await db.level.create({
            data: {
                name,
                order,
                lang,
                type,
                words,
                samuraiExpectedScore,
            },
        });
        const userLevel = await db.userLevel.create({
            data: {
                userId: locals?.user?.id ?? 1,
                levelId: level.id,
            },
        });
        let newPath = url.pathname.split("/");
        newPath.pop();

        throw redirect(303, `${newPath.join("/")}/levels`);
    },
};
