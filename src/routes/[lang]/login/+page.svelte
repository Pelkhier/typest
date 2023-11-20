<script lang="ts">
    import { slide } from "svelte/transition";
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";
    // TODO : signin and login UI need more user friendly optimization
    // TODO : remove langStore and replace it with page store, page store has the language
    import { langStore } from "$lib/store/global";
    import language from "$lib/language";
    import { LoadingButton } from "$lib/components";

    export let form: ActionData;

    let loading = false;

    $: form, (loading = false);
</script>

<div
    class="container flex justify-center items-center h-full"
    in:slide={{ duration: 300, axis: "x" }}
>
    <form
        method="POST"
        action="?/loginForm"
        class="signin flex flex-col gap-8 p-4 py-12 rounded-xl"
        on:submit={() => (loading = true)}
        use:enhance
    >
        <div>
            <input
                type="email"
                name="email"
                placeholder={language[`${$langStore}`].signin.emailPlaceholder}
                autocomplete="off"
                required
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
                required
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
                {language[`${$langStore}`].signin.loginButton}
            </LoadingButton>
        </div>
        <div class="w-full text-right pr-2">
            <a href="/{$langStore}/signin">
                <span class="login"
                    >{language[`${$langStore}`].signin.signinHref}</span
                >
                <span>&blacktriangleright; &blacktriangleright;</span>
            </a>
        </div>
    </form>
</div>

<style lang="postcss">
    form.signin {
        @apply shadow-gostwhite border-mygray;
        box-shadow: 0 0 8px;
        border: 0.5px solid;
        animation: form-shadow 1s infinite;
        transition: all 1s ease;
        width: 400px;
    }
    form.signin input {
        display: block;
        width: 100%;
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
            box-shadow: 0 0 8px gainsboro;
            @apply shadow-darkblue dark:shadow-gostwhite;
        }
        50% {
            box-shadow: 0 0 8px tomato;
            @apply shadow-tomato;
        }
    }
</style>
