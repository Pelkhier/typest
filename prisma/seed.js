import enData from "./initial-data/en-data.json" assert { type: "json" };
import arData from "./initial-data/ar-data.json" assert { type: "json" };

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
    console.log("Start seeding...");

    let levels = enData.levels.concat(arData.levels);

    for (let level of levels) {
        await db.level.create({ data: level });
    }

    console.log("Prisma seeding is done !!!");
}

main();
