import type { Lang } from "$lib/components/keyboard/types";
import { writable } from "svelte/store";

const defaultLang: Lang = "en";

export const langStore = writable<Lang>(defaultLang);
export const loader = writable(false);
export const settingsLoader = writable(false);
