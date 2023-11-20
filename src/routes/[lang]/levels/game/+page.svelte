<script lang="ts">
    import { Game } from "$lib/components/";
    import type { GameType } from "$lib/components/game/types";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;

    let gameType: GameType = data.game.level.type as GameType;
    let nextGameType = data.nextGame?.level?.type as GameType | null;

    $: {
        gameType = data.game.level.type as GameType;
        nextGameType = data.nextGame?.level?.type as GameType | null;
    }
</script>

{#key data.game.level.order}
    <Game data={data.game} {gameType} {nextGameType} />
{/key}
