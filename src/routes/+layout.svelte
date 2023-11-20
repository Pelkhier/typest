<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import "../styles/app.css";
    import type { Lang } from "$lib/components/keyboard/types";
    import { langStore } from "$lib/store/global";

    let lang: Lang = "en";

    onMount(() => {
        let localLang: Lang | null = localStorage.getItem("lang") as Lang;
        if (!localLang) {
            localStorage.setItem("lang", "en");
        } else {
            lang = localLang;
        }
        $langStore = lang;
        if ($page.url.pathname === "/") {
            goto(`${lang}`);
        }
    });
</script>

<slot />
