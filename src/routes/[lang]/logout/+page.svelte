<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import { langStore } from "$lib/store/global";
</script>

{#await invalidateAll() then value}
    {goto(`/${$langStore}/`)}
{/await}
