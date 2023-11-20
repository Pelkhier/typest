<script lang="ts">
    import { slide } from "svelte/transition";
    import type { ActionData } from "./$types";
    import { enhance } from "$app/forms";
    // TODO : signin and login UI need more user friendly optimization
    // TODO : remove langStore and replace it with page store, page store has the language
    import { langStore } from "$lib/store/global";
    import language from "$lib/language";
    import LoadingButton from "$lib/components/extra/loadingButton.svelte";

    export let form: ActionData;
    let loading = false;

    $: loading = form?.error ? !form.error : false;
    $: loading = form?.errors
        ? !(Object.entries(form.errors).length > 0)
        : false;
</script>

<div
    class="container flex justify-center items-center h-full"
    in:slide={{ duration: 300, axis: "x" }}
>
    <form
        method="POST"
        action="?/signinForm"
        class="signin flex flex-col gap-8 p-4 py-12 rounded-xl"
        on:submit={() => (loading = true)}
        use:enhance
    >
        <div>
            <input
                type="text"
                name="name"
                placeholder={language[`${$langStore}`].signin.namePlaceholder}
                autocomplete="off"
            />
            {#if form?.errors?.name}
                <smal class="text-sm text-tomato inline-block mt-2"
                    >{form.errors.name[0]}</smal
                >
            {/if}
        </div>
        <div>
            <input
                type="email"
                name="email"
                placeholder={language[`${$langStore}`].signin.emailPlaceholder}
                autocomplete="off"
            />
            {#if form?.errors?.email}
                <smal class="text-sm text-tomato inline-block mt-2"
                    >{form.errors.email[0]}</smal
                >
            {/if}
        </div>
        <div>
            <input
                type="password"
                name="password"
                placeholder={language[`${$langStore}`].signin
                    .passwordPlaceholder}
            />
            {#if form?.errors?.password}
                <smal class="text-sm text-tomato inline-block mt-2"
                    >{form.errors.password[0]}</smal
                >
            {/if}
            {#if form?.error}
                <small class="text-sm text-tomato inline-block mt-2"
                    >{form.message}</small
                >
            {/if}
        </div>

        <div class="flex justify-center">
            <LoadingButton
                type="submit"
                className="submit rounded-xl text-lg w-full"
                {loading}
            >
                {language[`${$langStore}`].signin.signinButton}
            </LoadingButton>
        </div>
        <div class="w-full text-right pr-2">
            <a href="/{$langStore}/login">
                <span class="login"
                    >{language[`${$langStore}`].signin.loginHref}</span
                >
                <span>&blacktriangleright; &blacktriangleright;</span>
            </a>
        </div>
    </form>
</div>

<style lang="postcss">
    form.signin {
        box-shadow: 0 0 8px;
        border: 0.5px solid;
        animation: form-shadow 1s infinite;
        transition: all 1s ease;
        width: 400px;
        @apply shadow-gostwhite border-gostwhite;
    }
    form.signin input {
        width: 100%;
        display: block;
        border-radius: 0.6rem;
        padding: 0.6rem;
        @apply bg-mygray text-darkblue;
    }
    :global(.signin button.submit) {
        height: 3.5rem;
        transition: all 0.4s ease;
        margin-top: 1rem;
        @apply bg-tomato;
    }

    :global(form.signin button.submit:hover) {
        @apply bg-mygray text-darkblue;
    }

    .login {
        text-decoration: underline;
    }

    @keyframes form-shadow {
        0% to {
            @apply shadow-darkblue dark:shadow-gostwhite;
            box-shadow: 0 0 8px gainsboro;
        }
        50% {
            @apply shadow-tomato;
            box-shadow: 0 0 8px tomato;
        }
    }
</style>
