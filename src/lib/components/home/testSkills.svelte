<script lang="ts">
    import { enhance } from "$app/forms";
    import language from "$lib/language";
    import type { Lang } from "../keyboard/types";

    export let lang: Lang;
</script>

<div class="test-skills w-full h-44 mt-6 rounded-3xl">
    <div class="flex items-center justify-center gap-14 h-full text-gostwhite">
        <div class="flex flex-col items-center justify-center gap-4 text-lg">
            <h2>{language[`${lang}`].testSkillTitle}</h2>
            <form method="post" action="?/getRandomStory" use:enhance>
                <button
                    class="px-8 py-2 font-bold rounded-md text-darkblue bg-gostwhite hover:bg-darkblue hover:text-gostwhite transition-colors"
                    type="submit"
                >
                    {language[`${lang}`].testSkillButton}
                </button>
            </form>
        </div>
        <div>
            <iconify-icon class="text-9xl" icon="material-symbols:keyboard" />
        </div>
    </div>
</div>

<style lang="postcss">
    :global(.layout[data-dir="en"] .home .test-skills) {
        background: rgb(255, 99, 71);
        background: linear-gradient(
            9deg,
            rgba(255, 99, 71, 1) 0%,
            rgba(195, 77, 55, 1) 100%
        );
    }
    :global(.layout[data-dir="ar"] .home .test-skills) {
        background: rgb(255, 99, 71);
        background: linear-gradient(
            351deg,
            rgba(255, 99, 71, 1) 0%,
            rgba(195, 77, 55, 1) 100%
        );
    }
</style>
