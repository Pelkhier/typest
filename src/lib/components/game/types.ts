import type { Action } from "svelte/action";

export type GameData = {
    time: number | null;
    accuracy: number | null;
    userId: number;
    levelId: number;
    completed: boolean;
    level: {
        words: string;
        lang: string;
        name: string;
        type: string;
        order: number;
    };
};

export type GameType = "learn" | "practice" | "samurai-game" | "story-time";

export type Game = "waiting for input" | "in progress" | "game over";

export type Words = string;

export type ActiveKey = {
    top: number;
    left: number;
    width: number;
    height: number;
} | null;

export type TextSize = "small" | "medium" | "large";

export type KeyboardSettins = {
    textSize: TextSize;
    keyboardSound: boolean;
    keyboardShow: boolean;
};

type Attributes = {
    "on:click_outside"?: (e: CustomEvent) => void;
};
export type OutsideEvent = Action<HTMLDivElement, any, Attributes>;
