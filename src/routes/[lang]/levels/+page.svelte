<script lang="ts">
    import { LevelCard } from "$lib/components";
    import { fade } from "svelte/transition";
    import type { PageServerData } from "./$types";
    import { page } from "$app/stores";
    import type { Lang } from "$lib/components/keyboard/types";
    import { onMount } from "svelte";

    export let data: PageServerData;
    let lang = $page.data.lang as Lang;
    let currentLevel = data.userLevels.findIndex(
        (level) => level.completed === false
    );

    let loadDiv: HTMLDivElement;
    let countOfLevels = 0;
    let disconnectObserver = false;

    onMount(async () => {
        const observer = new IntersectionObserver(async (entries) => {
            if (entries[0].isIntersecting) {
                if (disconnectObserver) return;
                countOfLevels += 18;
                console.log("load", disconnectObserver);
                disconnectObserver = await loadMoreLevels(countOfLevels);
            }
        });
        observer.observe(loadDiv);
    });

    async function loadMoreLevels(count: number) {
        let res = await fetch(`/api/load-levels?count=${count}`);
        let newLevels = (await res.json()) as typeof data.userLevels;
        if (newLevels.length === 0) {
            return true;
        }
        data.userLevels = [...data.userLevels, ...newLevels];
        return false;
    }
</script>

<div class="container my-16" in:fade={{ delay: 300, duration: 300 }}>
    <div id="levels" class="w-full grid grid-cols-6 gap-10 gap-y-20">
        {#each data.userLevels as userLevel, index}
            <LevelCard
                {userLevel}
                currentLevel={index === currentLevel}
                {lang}
            />
        {/each}
    </div>
    <div bind:this={loadDiv}></div>
</div>
