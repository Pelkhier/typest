<script lang="ts">
    import type { Lang } from "../keyboard/types";
    import { LogoPrimary } from "$lib/components";
    import language from "$lib/language";

    export let lang: Lang = "en";
</script>

<footer
    class="w-screen relative overflow-hidden h-[300px] bg-black text-center mt-20"
>
    <div class="absolute top-[-210px] z-0">
        <LogoPrimary
            className="h-[800px] w-[800px] opacity-5"
            primaryColor="#ddd"
            secondaryColor="#ddd"
        />
    </div>
    <div
        class="w-full h-full flex flex-col justify-center items-center absolute z-10"
    >
        <h2 class="mb-4">{language[lang].footer.contactUs}</h2>
        <ul class="mx-8 w-1/2 flex justify-center gap-3">
            <!-- Facebook -->
            <li>
                <a href="https://www.facebook.com/mohmmed.pelker.3/">
                    <iconify-icon
                        class="text-4xl transition-colors hover:text-blue-700"
                        icon="entypo-social:facebook"
                    />
                </a>
            </li>
            <!-- Facebook -->
            <!-- Whatsapp -->
            <li>
                <a href="https://api.whatsapp.com/send?phone=218927968762">
                    <iconify-icon
                        class="text-4xl transition-colors hover:text-green-500"
                        icon="fa6-brands:square-whatsapp"
                    />
                </a>
            </li>
            <!-- Whatsapp -->
            <!-- GitHub -->
            <li>
                <a href="https://github.com/Pelkhier/">
                    <iconify-icon
                        class="text-4xl transition-colors hover:text-tomato"
                        icon="fa:github-square"
                    />
                </a>
            </li>
            <!-- GitHub -->
            <!-- Twitter -->
            <li>
                <a href="#">
                    <iconify-icon
                        class="text-4xl transition-colors hover:text-sky-600"
                        icon="fa6-brands:square-x-twitter"
                    />
                </a>
            </li>
            <!-- Twitter -->
            <!-- Instagram -->
            <li>
                <a href="#">
                    <iconify-icon
                        class="text-4xl transition-colors hover:text-purple-600"
                        icon="fa6-brands:square-instagram"
                    />
                </a>
            </li>
            <!-- Instagram -->
        </ul>
    </div>
</footer>

<style lang="postcss">
    footer {
        background: #111111;
    }
</style>
