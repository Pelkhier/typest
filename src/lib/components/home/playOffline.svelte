<script lang="ts">
    import language from "$lib/language";
    import type { Lang } from "../keyboard/types";

    export let lang: Lang;
</script>

<div class="play-offline flex flex-col items-center w-full">
    <div class="always-direction-left flex flex-col items-center">
        <div class="h-full flex justify-center">
            <div class="h-10 w-6 grad-color">
                <div
                    class="h-10 w-6 bg-gostwhite dark:bg-darkblue rounded-r-3xl"
                />
            </div>
            <div class="details-separator w-4 h-10" />
            <div class="h-10 w-6 grad-color">
                <div
                    class="h-10 w-6 bg-gostwhite dark:bg-darkblue rounded-l-3xl"
                />
            </div>
        </div>
    </div>
    <div
        class="w-full border-2 dark:border border-darkblue dark:border-gostwhite rounded-2xl flex flex-col items-center gap-24 p-28 shadow-md"
    >
        <div class="flex flex-col items-center">
            <h2 class="text-5xl font-extrabold mb-6">
                {language[lang].offlineSection.title}
            </h2>
            <p>{language[lang].offlineSection.subtitle}</p>
        </div>
        <div class="flex w-1/3 justify-stretch">
            <a
                class="text-center p-2 rounded-md transition-colors hover:bg-blue-500 hover:text-gostwhite w-full"
                href="https://mega.nz/file/dK1GRZgL#v65mrOXuuIexPm0D62rt92pM6ZVDAMuNiyv9iplxfPg"
            >
                <h4 class="font-bold mb-2">
                    {language[lang].offlineSection.windows}
                </h4>

                <iconify-icon class="text-6xl" icon="ri:windows-fill"
                ></iconify-icon>
            </a>
            <a
                class="text-center p-2 rounded-md transition-colors hover:bg-yellow-600 w-full"
                href="/#"
            >
                <h4 class="font-bold mb-2">
                    {language[lang].offlineSection.linux}
                </h4>
                <iconify-icon class="text-6xl" icon="flat-color-icons:linux"
                ></iconify-icon>
            </a>
            <a
                class="text-center p-2 rounded-md transition-colors dark:hover:bg-gostwhite dark:hover:text-darkblue hover:bg-darkblue hover:text-gostwhite w-full"
                href="/#"
            >
                <h4 class="font-bold mb-2">
                    {language[lang].offlineSection.mac}
                </h4>

                <iconify-icon class="text-6xl" icon="wpf:mac-os"></iconify-icon>
            </a>
        </div>
    </div>
</div>

<style lang="postcss">
    .play-offline .always-direction-left {
        direction: ltr;
    }

    :global(html) .details-separator {
        background: rgb(106, 107, 108);
        background: linear-gradient(
            180deg,
            rgba(106, 107, 108, 1) 0%,
            rgba(29, 33, 43, 1) 100%
        );
    }

    :global(html.dark) .details-separator {
        background: rgb(190, 190, 192);
        background: linear-gradient(
            180deg,
            rgba(190, 190, 192, 1) 0%,
            rgba(248, 248, 255, 1) 100%
        );
    }
    :global(html) .grad-color {
        background: rgb(106, 107, 108);
        background: linear-gradient(
            180deg,
            rgba(106, 107, 108, 1) 0%,
            rgba(29, 33, 43, 1) 100%
        );
    }
    :global(html.dark) .grad-color {
        background: rgb(190, 190, 192);
        background: linear-gradient(
            180deg,
            rgba(190, 190, 192, 1) 0%,
            rgba(248, 248, 255, 1) 100%
        );
    }

    /* .play-offline .observer-left-child-default {
        transform: translatex(-100px);
        transition: transform 1s ease;
    }
    .play-offline .observer-right-child-default {
        transform: translatex(100px);
        transition: transform 1s ease;
    } */
</style>
