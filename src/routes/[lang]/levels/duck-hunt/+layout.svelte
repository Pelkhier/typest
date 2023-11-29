<script lang="ts">
    import { navigating } from "$app/stores";
</script>

{#if !$navigating}
    <slot />
{/if}
