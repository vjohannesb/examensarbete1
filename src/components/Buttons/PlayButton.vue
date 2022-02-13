<template>
    <span class="play-button" @click="toggleIcon">
        <template v-if="playing">⏸</template>
        <template v-else>▶</template></span
    >
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "PlayButton",
    data() {
        return {
            playing: false,
        };
    },
    methods: {
        toggleIcon() {
            this.playing = !this.playing;
        },
    },
});
</script>

<style lang="scss" scoped>
.play-button {
    cursor: pointer;
    display: inline-block;
    background: salmon;
    color: white;
    font-size: 2rem;
    font-weight: bold;
    font-family: Avenir, sans-serif;
    border: 2px solid salmon;
    border-radius: 4px;
    transition: 200ms;
    padding: 1rem 1.75rem 1rem 2rem;

    &:hover {
        background: transparent;
        color: salmon;
    }

    &:active {
        transform: scale(0.95);
    }
}
</style>
