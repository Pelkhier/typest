<script lang="ts">
    import { animateElementChildWhenShow } from "$lib/utils";
    import { onMount } from "svelte";
    import type { Lang } from "../keyboard/types";

    export let lang: Lang;
    // TODO : write real content, this is just placeholder ===============================================

    const numberOfDivs = 4;
    let leftDivs: HTMLDivElement[] | number[] = Array(numberOfDivs);
    let rightDivs: HTMLDivElement[] | number[] = Array(numberOfDivs);

    const details = {
        en: {
            details: "Details",
            title: "Test",
            content:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora libero doloremque iusto possimus mollitia sit accusamus facilis laudantium, ipsam est modi ipsum asperiores laboriosam distinctio odit cupiditate, dolorum alias ullam.",
        },
        ar: {
            details: "تفاصيل",
            title: "إختبار",
            content:
                "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.",
        },
    };
    // TODO : write real content, this is just placeholder ===============================================

    onMount(() => {
        animateElementChildWhenShow(leftDivs as HTMLDivElement[], {
            default: "translatex(0px)",
            above: "translatex(-100px)",
            lower: "translatex(-100px)",
        });
        animateElementChildWhenShow(rightDivs as HTMLDivElement[], {
            default: "translatex(0px)",
            above: "translatex(100px)",
            lower: "translatex(100px)",
        });
    });
</script>

<!-- TODO : fill with real content -->
<div class="home-details flex justify-center w-full mt-10">
    <div class="flex justify-between w-full">
        <div class="w-2/5 mt-40">
            <!-- TODO : write real content, this is just placeholder -->

            {#each leftDivs as leftDiv}
                <div bind:this={leftDiv}>
                    <div
                        class="observer-left-child-default border border-darkblue dark:border-gostwhite rounded-xl p-6 mt-6"
                    >
                        <h2 class="text-3xl font-bold mb-2">
                            {details[lang].title}
                        </h2>
                        <p class:font-extralight={lang === "ar"}>
                            {details[lang].content}
                        </p>
                    </div>
                </div>
            {/each}
        </div>

        <div class="always-direction-left flex flex-col items-center">
            <div class="bg-tomato rounded-lg p-2">
                <h1 class="text-4xl text-gostwhite">{details[lang].details}</h1>
            </div>
            <div class="h-full flex justify-center">
                <div class="h-6 w-6 bg-tomato">
                    <div
                        class="h-6 w-6 bg-gostwhite dark:bg-darkblue rounded-tr-2xl"
                    />
                </div>
                <div
                    class="details-separator w-1 h-[110%]"
                    class:h-f100={lang === "en"}
                />
                <div class="h-6 w-6 bg-tomato">
                    <div
                        class="h-6 w-6 bg-gostwhite dark:bg-darkblue rounded-tl-2xl"
                    />
                </div>
            </div>
        </div>

        <div class="w-2/5 mt-16">
            <!-- TODO : write real content, this is just placeholder -->
            {#each rightDivs as rightDiv}
                <div bind:this={rightDiv}>
                    <div
                        class="observer-right-child-default border border-darkblue dark:border-gostwhite rounded-xl p-6 mt-6"
                    >
                        <div>
                            <h2 class="text-3xl font-bold mb-2">
                                {details[lang].title}
                            </h2>
                            <p class:font-extralight={lang === "ar"}>
                                {details[lang].content}
                            </p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style lang="postcss">
    .home-details .always-direction-left {
        direction: ltr;
    }

    .h-f100 {
        @apply h-[105%];
    }

    :global(html) .details-separator {
        background: rgb(255, 99, 71);
        background: linear-gradient(
            180deg,
            rgba(255, 99, 71, 1) 0%,
            rgba(255, 99, 71, 1) 80%,
            rgba(29, 33, 43, 1) 100%
        );
    }

    :global(html.dark) .details-separator {
        background: rgb(255, 99, 71);
        background: linear-gradient(
            180deg,
            rgba(255, 99, 71, 1) 0%,
            rgba(255, 99, 71, 1) 80%,
            rgba(248, 248, 255, 1) 100%
        );
    }

    .home-details .observer-left-child-default {
        transform: translatex(-100px);
        transition: transform 1s ease;
    }
    .home-details .observer-right-child-default {
        transform: translatex(100px);
        transition: transform 1s ease;
    }
</style>
