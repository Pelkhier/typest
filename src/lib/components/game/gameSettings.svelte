<script lang="ts">
    import { Separator } from "$lib/components";
    import type { TextSize } from "./types";
    import { page } from "$app/stores";
    import { invalidateAll } from "$app/navigation";
    import { settingsLoader } from "$lib/store/global";
    import Spinner from "../extra/spinner.svelte";
    import language from "$lib/language";
    import type { Lang } from "../keyboard/types";

    export let startAgain: () => void;

    let lang: Lang = $page.data.lang;
    let textSize: TextSize = $page.data.settings.textSize;
    let keyboardSound = $page.data.settings.keyboardSound;
    let keyboardShow = $page.data.settings.keyboardShow;

    // TODO: consider using localStorage to store settings instead of the database to increase speed
    async function setSettings(settings: any) {
        $settingsLoader = true;
        const body = JSON.stringify({
            userId: $page.data.user.id,
            settings,
        });
        await fetch("/api/game/settings", {
            method: "POST",
            body,
        });
        // TODO : consider using invalidate(url)
        await invalidateAll();
        startAgain();
    }

    async function setTextSize(size: TextSize) {
        textSize = size;
        await setSettings({ textSize });
    }
    async function toggleSound() {
        keyboardSound = !keyboardSound;
        await setSettings({ keyboardSound });
    }
    async function toggleKeyboard() {
        keyboardShow = !keyboardShow;
        await setSettings({ keyboardShow });
    }
</script>

<div
    class="settings relative bg-darkblue dark:bg-gostwhite text-gostwhite dark:text-darkblue w-96 h-96 rounded-lg shadow-lg"
>
    {#if $settingsLoader}
        <Spinner
            wrapperClass="bg-gostwhite dark:bg-darkblue opacity-80 absolute z-[999] top-0 right-0 left-0 bottom-0"
            loaderClass="text-tomato w-[1.5em] h-[1.5em] text-lg"
        />
    {/if}
    <div
        class="text-size-settings text-size w-full h-1/2 px-2 flex gap-4 items-center justify-around"
    >
        <div class="w-full flex justify-center">
            <button
                on:click={() => setTextSize("small")}
                class:size-selected={textSize === "small"}
                class="flex flex-col justify-center items-center px-2 rounded-lg"
            >
                <iconify-icon class="text-3xl" icon="fluent:text-12-filled" />
                <small>{language[`${lang}`].keyboardSettings.smallText}</small>
            </button>
        </div>
        <div class=" w-full flex justify-center">
            <button
                on:click={() => setTextSize("medium")}
                class:size-selected={textSize === "medium"}
                class="flex flex-col justify-center items-center px-2 rounded-lg"
            >
                <iconify-icon class="text-6xl" icon="fluent:text-12-filled" />
                <small>{language[`${lang}`].keyboardSettings.mediumText}</small>
            </button>
        </div>
        <div class="w-full flex justify-center">
            <button
                on:click={() => setTextSize("large")}
                class:size-selected={textSize === "large"}
                class="flex flex-col justify-center items-center px-2 rounded-lg"
            >
                <iconify-icon class="text-9xl" icon="fluent:text-12-filled" />
                <small>{language[`${lang}`].keyboardSettings.largeText}</small>
            </button>
        </div>
    </div>
    <Separator bgColor="bg-gostwhite dark:bg-darkblue" />
    <div class="flex justify-center w-full h-2/5 mt-4 gap-16">
        <div class="keyboard-settings">
            <button
                on:click={toggleSound}
                class:play={keyboardSound}
                class="flex justify-center p-2 rounded-md"
            >
                {#if keyboardSound}
                    <iconify-icon class="text-4xl" icon="entypo:sound" />
                {:else}
                    <iconify-icon class="text-4xl" icon="entypo:sound-mute" />
                {/if}
            </button>
            <small>{language[`${lang}`].keyboardSettings.keyboardSound}</small>
        </div>
        <div
            class="keyboard-settings flex flex-col items-center justify-center gap-2"
        >
            <button
                on:click={toggleKeyboard}
                class:play={keyboardShow}
                class="flex justify-center p-2 rounded-md"
            >
                {#if keyboardShow}
                    <iconify-icon
                        class="text-4xl"
                        icon="material-symbols:keyboard"
                    />
                {:else}
                    <iconify-icon
                        class="text-4xl"
                        icon="material-symbols:keyboard-off"
                    />
                {/if}
            </button>
            <small>{language[`${lang}`].keyboardSettings.KeyboardShow}</small>
        </div>
    </div>
</div>

<style lang="postcss">
    .text-size-settings button {
        @apply text-gostwhite dark:text-darkblue;
    }

    .keyboard-settings {
        @apply flex flex-col items-center justify-center gap-2;
    }

    .text-size-settings button.size-selected,
    .keyboard-settings button.play {
        @apply bg-gostwhite text-darkblue dark:bg-darkblue dark:text-gostwhite;
    }

    .keyboard-settings button {
        border: 1px solid;
        @apply border-gostwhite dark:border-darkblue;
    }
</style>
