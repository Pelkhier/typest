import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import type { UserLoginInfo, UserSigninInfo, UserToken } from "./types";
import db from "../database";
import type { Lang } from "$lib/components/keyboard/types";

export async function loginUser({ email, password }: UserLoginInfo) {
    // TODO: password should be encrypted
    let user = await db.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
        },
    });

    if (user) {
        const isCorrect = await bcrypt.compare(password, user.password);

        if (!isCorrect) {
            return null;
        }
    } else {
        return null;
    }
    return { id: user?.id, name: user?.name, email: user?.email };
}

export async function signinUser({ name, email, password }: UserSigninInfo) {
    // TODO : password should be encrypted
    const hashPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
        data: {
            name,
            email,
            password: hashPassword,
        },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });

    const levels = await db.level.findMany({ select: { id: true } });
    let data = [];
    for (let level of levels) {
        data.push({
            userId: user.id,
            levelId: level.id,
        });
    }
    await db.userLevel.createMany({ data });
    // for (let level of levels) {
    //     await db.userLevel.create({
    //         data: {
    //             userId: user.id,
    //             levelId: level.id,
    //         },
    //     });
    // }

    return user;
}

export async function logoutUser() {}

export async function validateUserToken(userToken: UserToken) {
    const user = await db.user.findUnique({
        where: {
            id: userToken.id,
        },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
    return user;
}

export const signJWT = async (
    payload: { sub: string },
    options: { exp: string },
    jwtSecret: string
) => {
    try {
        const secret = new TextEncoder().encode(jwtSecret);
        const alg = "HS256";
        return new SignJWT(payload)
            .setProtectedHeader({ alg })
            .setExpirationTime(options.exp)
            .setIssuedAt()
            .setSubject(payload.sub)
            .sign(secret);
    } catch (error) {
        throw error;
    }
};
export const verifyJWT = async <T>(
    token: string,
    jwtSecret: string
): Promise<T> => {
    try {
        return (await jwtVerify(token, new TextEncoder().encode(jwtSecret)))
            .payload as T;
    } catch (error) {
        console.log(error);
        throw new Error("Your token has expired.");
    }
};

export const getUserStats = async (id: number, lang: Lang) => {
    let userLevels = await db.userLevel.findMany({
        where: {
            userId: id,
            level: {
                type: "learn",
                lang,
            },
        },
    });

    let completed = userLevels.filter((level) => level.completed === true);

    let completedLevelsCount = completed.length;

    const storyLevels = await db.userLevel.findMany({
        where: {
            userId: id,
            level: {
                type: "story-time",
                lang,
            },
        },
        select: {
            accuracy: true,
            wpm: true,
        },
    });
    const lastStoryTime = storyLevels.length > 0 ? storyLevels.at(-1) : null;

    const currentLevel = await db.userLevel.findFirst({
        where: {
            userId: id,
            completed: false,
            level: {
                lang,
            },
        },
        select: {
            level: {
                select: {
                    order: true,
                    type: true,
                    name: true,
                },
            },
        },
    });
    return {
        completedLevelsCount,
        allLevelsCount: userLevels.length,
        lastStoryTime,
        currentLevel,
    };
};
