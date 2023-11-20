import type { ar } from "./lettersLang";

export type Lang = "en" | "ar";

export type ChoosenLang = typeof ar;

export type TextContent = (typeof ar)["textContentLC"];
