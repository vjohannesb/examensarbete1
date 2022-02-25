<template>
    <h1>Custom synth</h1>
    <div class="d-flex flex-col justify-center">
        <label for="cs-attack"> Attack: {{ envelope.attack }}ms </label>
        <input
            name="cs-attack"
            type="range"
            v-model="envelope.attack"
            min="0"
            max="2000"
            @change="playNote" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Synth } from "tone";
import * as Tone from "tone";

export default defineComponent({
    name: "CustomSynth",
    setup() {
        return { synth: new Synth().toDestination() };
    },
    data() {
        return {
            envelope: {
                attack: 0,
                decay: 1,
                release: 1,
                sustain: 1,
            },
            detune: 0,
            portamento: 0,
            volume: 0.9,
        };
    },
    methods: {
        playNote() {
            const now = Tone.now();
            this.synth.envelope.attack = this.envelope.attack / 1000;
            this.synth.envelope.decay = this.envelope.decay;
            this.synth.envelope.release = this.envelope.release;
            this.synth.envelope.sustain = this.envelope.sustain;
            this.synth.triggerAttackRelease("C4", "16n", now, 0.9);
        },
    },
});
</script>

<style lang="scss"></style>
