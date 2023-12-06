<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import "../styles/app.css";
    import type { Lang } from "$lib/components/keyboard/types";
    import { langStore } from "$lib/store/global";
    import Spinner from "$lib/components/extra/spinner.svelte";

    let lang: Lang = "en";
    let userAgent: string;

    // TODO : this might block search engine bots which would cause bad SEO, so it needs to be more explicit condition block than just blocking all devices other than desktop
    async function verifySupport(userAgent: string) {
        const body = JSON.stringify({ userAgent });
        const response = await fetch("/api/device-support", {
            method: "POST",
            body,
        });
        if (!response.ok) {
            throw new Error();
        }
        return response.ok;
    }

    onMount(async () => {
        userAgent = navigator.userAgent;

        let localLang: Lang | null = localStorage.getItem("lang") as Lang;
        if (!localLang) {
            localStorage.setItem("lang", "en");
        } else {
            lang = localLang;
        }
        document.body.dataset.lang = lang;
        document.body.dir = lang === "en" ? "ltr" : "rtl";
        $langStore = lang;
        if ($page.url.pathname === "/") {
            goto(`/${lang}`);
        }
    });
</script>

{#if userAgent}
    {#await verifySupport(userAgent)}
        <Spinner
            wrapperClass="bg-gostwhite dark:bg-darkblue opacity-80 fixed z-[999] top-0 right-0 left-0 bottom-0"
            loaderClass="text-tomato w-[1.5em] h-[1.5em] text-lg"
        />
    {:then value}
        <slot />
    {:catch}
        <div
            class="container not-supported h-screen w-screen flex items-center justify-center"
        >
            <div>
                <h1 class="text-6xl">Sorry!!!</h1>
                <p>Your device not supported.</p>
            </div>
        </div>
    {/await}
{/if}
