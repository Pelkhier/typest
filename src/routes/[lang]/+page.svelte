<script lang="ts">
    import { fade } from "svelte/transition";
    import language from "$lib/language";
    import type { PageServerData } from "./$types";
    import type { Lang } from "$lib/components/keyboard/types";
    import { page } from "$app/stores";
    import HeroNotLogedin from "$lib/components/home/heroNotLogedin.svelte";
    import type { UserClient } from "$lib/components/home/types";
    import HeroLogedin from "$lib/components/home/heroLogedin.svelte";
    import { enhance } from "$app/forms";

    export let data: PageServerData;

    const lang: Lang = $page.data.lang;
    const user: UserClient = $page.data.user;


</script>

<svelte:head>
    <title>Typest | Type Fast + Type Fun</title>
    <meta
        name="description"
        content="If you want to type fast and accurate, a place where you learn and practice fast typing in both languages, Arabic and English, this is you place."
    />
</svelte:head>

<div
    class="home mb-10"
    in:fade={{ delay: 300, duration: 300 }}
    out:fade={{ duration: 300 }}
>
    <!-- Start Hero Section -->
    <div class="hero flex items-center justify-center" data-dir={lang}>
        {#if !user}
            <HeroNotLogedin />
        {:else}
            <HeroLogedin userStats={data.userStats} />
        {/if}

        <div class="key backspace flex justify-around items-center">
            <iconify-icon icon="ph:arrow-up-bold" rotate="270deg" />
            <div>backspace</div>
        </div>
        <div class="key enter flex justify-around items-center">
            <div><iconify-icon icon="mi:enter" /></div>
            <div>enter</div>
        </div>
        <div class="key shiftright flex justify-end items-center gap-2">
            <iconify-icon icon="lucide:move-up" />
            <div>shift</div>
        </div>
        <div class="key space">space</div>
        <div class="key tab flex items-center justify-around">
            <div>tab</div>
            <div class="flex flex-col justify-around h-full">
                <iconify-icon icon="octicon:tab-24" />
                <iconify-icon icon="octicon:tab-24" flip="horizontal" />
            </div>
        </div>
        <div class="key alt-right flex items-center justify-center">alt</div>
        <div class="key control-left flex items-center justify-center">
            ctrl
        </div>
        <div
            class="key three flex items-center justify-center text-xl font-bold"
        >
            3
        </div>
        <div class="key six flex items-center justify-center text-xl font-bold">
            6
        </div>
        <div
            class="key zero flex items-center justify-center text-xl font-bold"
        >
            0
        </div>
    </div>
    <!-- End Hero Section -->

    <!-- Start Test Skills Section -->
    <div class="test-skills w-full h-44 mt-6 rounded-3xl">
        <div
            class="flex items-center justify-center gap-14 h-full text-gostwhite"
        >
            <div
                class="flex flex-col items-center justify-center gap-4 text-lg"
            >
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
                <iconify-icon
                    class="text-9xl"
                    icon="material-symbols:keyboard"
                />
            </div>
        </div>
    </div>
    <!-- Start Test Skills Section -->

    <!-- Start Contribute Section -->
    <div class="contributors w-full h-[40rem] mt-6 flex flex-col items-center">
        <div class="my-8 flex w-full items-center">
            <div class="bg-darkblue dark:bg-gostwhite h-1 w-full" />
            <div
                class="flex gap-4 items-center rounded-full bg-darkblue dark:bg-gostwhite px-6 py-1"
            >
                <h2
                    class="text-2xl font-bold text-gostwhite dark:text-darkblue"
                >
                    {language[`${lang}`].contributors}
                </h2>
                <iconify-icon
                    class="text-5xl text-gostwhite dark:text-darkblue"
                    icon="mdi:github"
                />
            </div>
            <div class="bg-darkblue dark:bg-gostwhite h-1 w-full" />
        </div>

        <div
            class="h-full w-1/2 mb-6 px-4 py-6 rounded-xl bg-darkblue bg-opacity-10 dark:bg-gostwhite dark:bg-opacity-20 shadow-md shadow-darkblue"
        >
            <ul
                class="list h-[24rem] w-full px-6 py-3 flex flex-col gap-4 rounded-md text-gostwhite overflow-y-auto overflow-x-clip"
            >
                {#each data.githubUsers as githubUser}
                    <li
                        class="flex items-center justify-between rounded-lg transition-transform ease-in-out hover:scale-105 shadow-md"
                    >
                        <div class="flex items-center w-full">
                            <img
                                src={githubUser?.avatar_url}
                                sizes="50px, 50px"
                                width="4rem"
                                height="4rem"
                                alt="img"
                                class="h-16 w-16 m-3 rounded-full border-gostwhite border-2"
                            />
                            <div>
                                <h3 class="text-lg font-bold">
                                    {githubUser?.name}
                                </h3>
                                <p class="text-sm">
                                    {githubUser?.description ?? ""}
                                </p>
                            </div>
                        </div>
                        <ul class="social mx-8 w-1/2 flex justify-end gap-3">
                            {#if githubUser?.socials.facebook}
                                <li>
                                    <a href={githubUser?.socials.facebook}>
                                        <iconify-icon
                                            class="text-4xl transition-colors hover:text-blue-700"
                                            icon="entypo-social:facebook"
                                        />
                                    </a>
                                </li>
                            {/if}
                            {#if githubUser?.socials.twitter}
                                <li>
                                    <a href={githubUser?.socials.twitter}>
                                        <iconify-icon
                                            class="text-4xl transition-colors hover:text-sky-600"
                                            icon="fa6-brands:square-x-twitter"
                                        />
                                    </a>
                                </li>
                            {/if}
                            {#if githubUser?.socials.instagram}
                                <li>
                                    <a href={githubUser?.socials.instagram}>
                                        <iconify-icon
                                            class="text-4xl transition-colors hover:text-purple-600"
                                            icon="fa6-brands:square-instagram"
                                        />
                                    </a>
                                </li>
                            {/if}
                            {#if githubUser?.socials.whatsapp}
                                <li>
                                    <a
                                        href="https://api.whatsapp.com/send?phone={githubUser
                                            ?.socials.whatsapp}"
                                    >
                                        <iconify-icon
                                            class="text-4xl transition-colors hover:text-green-500"
                                            icon="fa6-brands:square-whatsapp"
                                        />
                                    </a>
                                </li>
                            {/if}
                            {#if githubUser?.socials.github}
                                <li>
                                    <a href={githubUser?.socials.github}>
                                        <iconify-icon
                                            class="text-4xl transition-colors hover:text-tomato"
                                            icon="fa:github-square"
                                        />
                                    </a>
                                </li>
                            {/if}
                        </ul>
                    </li>
                {/each}
            </ul>
        </div>
        <div class="bg-darkblue dark:bg-gostwhite h-1 w-full mt-6" />
    </div>
    <!-- End Contribute Section -->
</div>

<style lang="postcss">
    .home .hero {
        height: 80vh;
        min-height: 600px;
        min-width: 1200px;
    }
    :global(html .layout[data-dir="en"] .home .hero) {
        border-radius: 1.5rem 0 1.5rem 1.5rem;

        background: rgb(122, 122, 122);
        background: linear-gradient(
            9deg,
            rgba(122, 122, 122, 1) 0%,
            rgba(29, 33, 43, 1) 84%,
            rgba(29, 33, 43, 1) 100%
        );
    }
    :global(html.dark .layout[data-dir="en"] .home .hero) {
        background: rgb(179, 179, 179);
        background: linear-gradient(
            9deg,
            rgba(179, 179, 179, 1) 0%,
            rgba(248, 248, 255, 1) 84%,
            rgba(248, 248, 255, 1) 100%
        );
    }
    :global(html .layout[data-dir="ar"] .home .hero) {
        border-radius: 0 1.5rem 1.5rem 1.5rem;
        background: rgb(122, 122, 122);
        background: linear-gradient(
            351deg,
            rgba(122, 122, 122, 1) 0%,
            rgba(29, 33, 43, 1) 84%,
            rgba(29, 33, 43, 1) 100%
        );
    }
    :global(html.dark .layout[data-dir="ar"] .home .hero) {
        background: rgb(179, 179, 179);
        background: linear-gradient(
            351deg,
            rgba(179, 179, 179, 1) 0%,
            rgba(248, 248, 255, 1) 84%,
            rgba(248, 248, 255, 1) 100%
        );
    }

    .hero {
        position: relative;
    }

    .key {
        position: absolute;
        direction: ltr;
        height: 4rem;
        opacity: 0;
        border: 1px solid;
        animation: key 8s infinite;
        border-radius: 0.3rem;
        @apply border-gostwhite dark:border-darkblue text-gostwhite dark:text-darkblue;
    }
    .key.backspace {
        top: 10px;
        right: 10px;
        width: 8rem;
        animation-delay: 3s;
        animation-duration: 14s;
    }
    .key.enter {
        right: 10px;
        width: 9rem;
    }
    .key.shiftright {
        right: 10px;
        top: 60%;
        width: 12rem;
        animation-delay: 4.5s;
    }
    .key.space {
        bottom: 10px;
        width: 40%;
        animation-delay: 2s;
    }
    .key.tab {
        left: 10px;
        top: 6rem;
        width: 7rem;
        animation-delay: 5.5s;
        animation-duration: 14s;
    }
    .key.alt-right {
        bottom: 10px;
        right: 20%;
        width: 5rem;
        animation-delay: 6s;
    }
    .key.control-left {
        bottom: 10px;
        left: 10px;
        width: 5rem;
        animation-delay: 0.5s;
    }
    .key.three {
        top: 10px;
        left: 20%;
        width: 5rem;
        animation-delay: 1.2s;
    }
    .key.six {
        top: 10px;
        width: 5rem;
        animation-delay: 3s;
    }
    .key.zero {
        top: 10px;
        right: 20%;
        width: 5rem;
    }

    @keyframes key {
        0%,
        to {
            opacity: 0;
        }
        35% {
            box-shadow: 8px 8px 8px black;
            opacity: 0.3;
        }
        70% {
            opacity: 0;
        }
    }

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

    .home .contributors .list {
        direction: ltr;
        box-shadow: 0px 0px 6px black inset;
    }
    .home .contributors .list > li {
        background: radial-gradient(
            circle at -8.9% 51.2%,
            tomato 0%,
            tomato 15.9%,
            #990000 15.9%,
            #990000 50.4%,
            rgb(19, 30, 37) 50.5%,
            rgb(19, 30, 37) 66%
        );
    }
</style>
