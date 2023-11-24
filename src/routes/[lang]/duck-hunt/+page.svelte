<script lang="ts">
    import { Application, Text } from "svelte-pixi";
</script>

<Application width={400} height={400}>
    <Text
        text="Hello World"
        anchor={0.5}
        x={200}
        y={200}
        style={{
            fill: "white",
        }}
    />
</Application>
