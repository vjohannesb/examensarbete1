<template>
    <button class="play-button" @click="toggleIcon">
        <span class="stop-icon" v-if="playing">■</span>
        <span class="play-icon" v-else>▷</span>
    </button>
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
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: salmon;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 2rem;
    padding: 0.25rem 1rem;
}
</style>
