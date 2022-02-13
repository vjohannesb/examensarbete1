<template>
    <h1>Main synth</h1>
    <PlayButton @click="togglePlaying" />
</template>

<script lang="ts">
import * as Tone from "tone";
import { defineComponent } from "vue";
import PlayButton from "../Buttons/PlayButton.vue";

export default defineComponent({
    name: "MainSynth",
    components: { PlayButton },
    setup() {
        const synth = new Tone.Synth({
            envelope: { attack: 0.01, release: 1 },
            oscillator: { type: "fatsine1", phase: 90 },
        }).toDestination();
        return { synth };
    },
    data() {
        return {
            play: false,
        };
    },
    methods: {
        togglePlaying() {
            console.log("TogglePlaying: ", this.play, !this.play);
            this.play = !this.play;
            if (this.play) this.playSynth();
        },
        playSynth() {
            if (!this.play) return;
            console.log("PlaySynth()");

            const now = Tone.now();
            const randomNote = Math.floor(Math.random() * 22000);
            this.synth.triggerAttackRelease(randomNote, "32n", now + 0, 0.9);
            setTimeout(this.playSynth, 500);
        },
    },
});
</script>

<style lang="scss"></style>
