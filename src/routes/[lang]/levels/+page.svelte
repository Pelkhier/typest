<script lang="ts">
    import { LevelCard } from "$lib/components";
    import { fade } from "svelte/transition";
    import type { PageServerData } from "./$types";
    import { page } from "$app/stores";
    import type { Lang } from "$lib/components/keyboard/types";

    export let data: PageServerData;
    let lang = $page.data.lang as Lang;
    let currentLevel = data.userLevels.findIndex(
        (level) => level.completed === false
    );
</script>

<div class="container mt-16" in:fade={{ delay: 300, duration: 300 }}>
    <div id="levels" class="w-full grid grid-cols-6 gap-10 gap-y-16">
        {#each data.userLevels as userLevel, index}
            <LevelCard
                {userLevel}
                currentLevel={index === currentLevel}
                {lang}
            />
        {/each}
    </div>
</div>
