// See https://kit.svelte.dev/docs/types#app

import type { Lang } from "$lib/components/keyboard/types";

// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user: {
                id: number;
                name: string;
                email: string;
            } | null;
            lang: "en" | "ar" | null;
        }
        // interface PageData {}
        // interface Platform {}
    }
}

export {};
