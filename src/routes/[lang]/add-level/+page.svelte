<script lang="ts">
    // NOTE : this page is just for dev only
    // TODO : inputs should be validated properly ( for other developers to not make mistakes inserting unvalid data into the data base )
    import { enhance } from "$app/forms";
    import type { GameType } from "$lib/components/game/types";

    let gameType: GameType = "learn";
</script>

<form
    class="flex flex-col gap-4 w-96"
    method="POST"
    action="?/addLevel"
    use:enhance
>
    <input type="text" name="name" required placeholder="name" />
    <input type="number" name="order" min="0" required placeholder="order" />
    <select name="lang" id="lang" class="text-darkblue">
        <option value="en">en</option>
        <option value="ar">ar</option>
    </select>
    <select name="type" id="type" class="text-darkblue" bind:value={gameType}>
        <option value="learn">learn</option>
        <option value="practice">practice</option>
        <option value="story-time">story-time</option>
        <option value="samurai-game">samurai-game</option>
    </select>
    {#if gameType === "samurai-game"}
        <input
            type="number"
            min="1"
            required
            name="expected-score"
            placeholder="Expected word per second"
        />
    {/if}
    <input type="text" name="words" required placeholder="words" />
    <button type="submit">Add++</button>
</form>

<style lang="postcss">
    input {
        color: black;
        padding: 1rem;
    }
</style>
