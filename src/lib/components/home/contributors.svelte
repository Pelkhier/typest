<script lang="ts">
    import language from "$lib/language";
    import { onMount } from "svelte";
    import type { Lang } from "../keyboard/types";
    import type { GithubUser } from "./types";
    import { animateElementChildWhenShow } from "$lib/utils";

    export let githubUsers: GithubUser;
    export let lang: Lang;

    let listDiv: HTMLDivElement;
    let footerDiv: HTMLDivElement;
    onMount(() => {
        animateElementChildWhenShow([listDiv, footerDiv]);
    });
</script>

<div class="contributors w-full h-[40rem] mt-6 flex flex-col items-center">
    <div class="my-8 w-full">
        <div class="flex w-full items-center">
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
    </div>

    <div
        bind:this={listDiv}
        class="h-full w-1/2 mb-6 px-4 py-6 rounded-xl bg-darkblue bg-opacity-10 dark:bg-gostwhite dark:bg-opacity-20 shadow-md shadow-darkblue"
    >
        <ul
            class="list h-[24rem] w-full px-6 py-3 flex flex-col gap-4 rounded-md text-gostwhite overflow-y-auto overflow-x-clip observer-child-default"
        >
            {#each githubUsers as githubUser}
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
    <div bind:this={footerDiv} class="w-full mt-6">
        <div
            class="bg-darkblue dark:bg-gostwhite h-1 w-full observer-child-default"
        />
    </div>
</div>

<style lang="postcss">
    .contributors .list {
        direction: ltr;
        box-shadow: 0px 0px 6px black inset;
    }
    .contributors .list > li {
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
    .contributors .observer-child-default {
        transform: translatey(100px);
        transition: transform 1s ease;
    }
</style>
