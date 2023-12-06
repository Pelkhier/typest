<script lang="ts">
    import { page } from "$app/stores";

    import language from "$lib/language";
    import type { Lang } from "../keyboard/types";
    let lang: Lang = $page.data.lang;
</script>

<div
    class="flex flex-col items-center gap-20 select-none text-gostwhite dark:text-darkblue"
>
    <h1 class="font-extrabold text-8xl">
        <span><strong>{language[`${lang}`].heroTitle[0]}</strong></span
        >{language[`${lang}`].heroTitle.slice(1)}
    </h1>
    <div class="flex flex-col gap-6">
        <p class="text-xl">{language[`${lang}`].heroSubtitle}</p>
        <a
            href="/{lang}/levels"
            data-sveltekit-preload-data="off"
            class="bg-tomato rounded-md py-4 px-2 block text-center text-2xl font-bold hover:bg-gostwhite dark:hover:bg-darkblue hover:text-darkblue dark:hover:text-gostwhite transition-colors"
        >
            {language[`${lang}`].heroButtonPlay}
        </a>
    </div>
</div>

<style lang="postcss">
    h1 span {
        display: inline-block;
        background: transparent;
        animation: hero-caret 2s infinite;
    }
    @keyframes hero-caret {
        0%,
        to {
            background-color: transparent;
        }

        25%,
        75% {
            background-color: tomato;
        }
    }
</style>
