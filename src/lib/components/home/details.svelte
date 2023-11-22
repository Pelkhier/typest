<script lang="ts">
    import { onMount } from "svelte";

    let divEl: HTMLDivElement;

    onMount(() => {
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let el = divEl.firstElementChild as HTMLDivElement;
                    el.style.transform = "translate(0)";
                } else {
                    let el = divEl.firstElementChild as HTMLDivElement;
                    el.style.transform = "translate(-200%)";
                }
            });
        });
        observer.observe(divEl);
    });
</script>

<div bind:this={divEl} class="inline-block">
    <div class="test bg-blue-500 text-2xl">test</div>
</div>

<style lang="postcss">
    .test {
        transform: translate(-200%);
        transition: all 1s ease;
    }
</style>
