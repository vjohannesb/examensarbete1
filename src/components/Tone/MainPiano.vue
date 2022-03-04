<template>
    <template v-if="$store.state.samplesReady">
        <PlayButton @click="togglePlaying" />
    </template>
    <span v-else>Loading samples...</span>
    <p>{{ $store.state.lastPlayedNote }}</p>
    <p>{{ $store.state.lastPlayedChord.join(" ") }}</p>
</template>

<script lang="ts">
import store from "@/store";
import {
    generateChord,
    getNextNote,
    getNotesInKey,
    scheduler,
} from "@/utils/tone/generator";
import * as Tone from "tone";
import { defineComponent } from "vue";
import PlayButton from "../Buttons/PlayButton.vue";

export default defineComponent({
    name: "MainPiano",
    components: { PlayButton },
    mounted() {
        Tone.Transport.stop();
        const sampler = new Tone.Sampler({
            urls: {
                A1: "/samples/A1.mp3",
                A2: "/samples/A2.mp3",
                A3: "/samples/A3.mp3",
                A4: "/samples/A4.mp3",
                A5: "/samples/A5.mp3",
                A6: "/samples/A6.mp3",
                A7: "/samples/A7.mp3",
            },
            release: 20,
            onload() {
                store.state.samplesReady = true;
                Tone.Transport.cancel();
                scheduler(sampler, getNextNote);
                scheduler(sampler, generateChord);
            },
            onerror(err) {
                console.error("Failed to load samples - ", err);
            },
        }).toDestination();
        const reverb = new Tone.Reverb({
            wet: 1,
            decay: 10,
            preDelay: 13 / 1000,
        }).toDestination();
        sampler.connect(reverb);
        store.state.notesInKeyMode = getNotesInKey("C", "ionian");
        this.sampler = sampler;
    },
    data() {
        return {
            playing: false,
            sampler: new Tone.Sampler(),
        };
    },
    methods: {
        togglePlaying() {
            if (this.playing) Tone.Transport.pause();
            else Tone.Transport.start();
            this.playing = !this.playing;
        },
    },
});
</script>

<style lang="scss"></style>
