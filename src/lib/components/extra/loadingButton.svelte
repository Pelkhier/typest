<script lang="ts">
    type ButtonType = "button" | "submit" | "reset" | null | undefined;
    export let loading = false;
    export let type: ButtonType = "button";
    export let className = "";
</script>

{#if !loading}
    <button {type} class={className} disabled={loading}>
        <div>
            <slot />
        </div>
    </button>
{:else}
    <button class={className + " smaller"} disabled>
        <div class="inner rounded-md">
            <div class="opacity-0">
                <slot />
            </div>
        </div>
    </button>
{/if}

<style lang="postcss">
    button.smaller {
        width: 100%;
        padding: 0;
        /* height: auto; */
        animation: shrink 1s forwards;
    }
    /* button.spin {
        animation: spin 1s infinite 3s;
    } */
    button.smaller .inner {
        width: 100%;
        height: 100%;
        animation: spin 1s infinite 1s ease-out;
        /* transition: spin 0.5s ease; */
        @apply bg-tomato;
    }
    /* 
    button.spining {
        display: none;
        width: 20%;
    } */

    @keyframes shrink {
        0% {
            width: 100%;
        }
        100% {
            width: 15%;
            background-color: transparent;
        }
    }
    @keyframes spin {
        0% {
            transform: rotate(0);
        }
        25% {
            transform: rotate(90deg);
        }
        50% {
            transform: rotate(180deg);
        }
        75% {
            transform: rotate(270deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
