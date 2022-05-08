<template>
    <template v-if="$store.state.samplesReady">
        <PlayButton @click="togglePlaying" />
    </template>
    <span v-else>Loading samples...</span>
</template>

<script lang="ts">
import store from "@/store";
import { getNotesInKey } from "@/utils/generator";
import { scheduleNotes, scheduleChords } from "@/utils/scheduling";
import * as Tone from "tone";
import { defineComponent } from "vue";
import PlayButton from "../Buttons/PlayButton.vue";

export default defineComponent({
    name: "MainPiano",
    components: { PlayButton },
    mounted() {
        Tone.Transport.stop();
        Tone.Transport.bpm.value = 100;
        const volume = new Tone.Volume(-12).toDestination();
        this.$store.commit("SET_VOLUME", volume);

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
                scheduleNotes(sampler);
                scheduleChords(sampler);
            },
            onerror(err) {
                console.error("Failed to load samples - ", err);
            },
        }).connect(volume);
        const reverb = new Tone.Reverb({
            wet: 1,
            decay: 10,
            preDelay: 13 / 1000,
        }).connect(volume);
        sampler.connect(reverb);

        store.state.notesInKeyMode = getNotesInKey(
            store.state.key,
            store.state.mode
        );
    },
    data() {
        return {
            playing: false,
        };
    },
    // ...
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
