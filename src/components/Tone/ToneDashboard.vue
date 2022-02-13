<template>
    <h1>Dashboard</h1>
    <MainSynth />
    <!-- <CustomSynth /> -->
</template>

<script lang="ts">
import * as Tone from "tone";
import { defineComponent } from "vue";
// import CustomSynth from "./CustomSynth.vue";
import MainSynth from "./MainSynth.vue";

export default defineComponent({
    name: "ToneDashboard",
    mounted() {
        const synth = new Tone.Synth({
            envelope: { attack: 0.01, release: 1 },
            oscillator: { type: "fatsine1", phase: 90 },
        }).toDestination();
        const now = Tone.now();
        synth.triggerAttackRelease("C4", "32n", now + 0, 0.9);
        synth.triggerAttackRelease("G4", "32n", now + 0.3, 0.9);
    },
    components: { /* CustomSynth, */ MainSynth },
});
</script>

<style lang="scss"></style>
