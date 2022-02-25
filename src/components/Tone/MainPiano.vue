<template>
    <h1>Main synth</h1>
    <template v-if="$store.state.samplesReady">
        <PlayButton @click="togglePlaying" />
    </template>
    <span v-else>Loading samples...</span>
    <p>{{ $store.state.lastPlayedNote }}</p>
</template>

<script lang="ts">
import store from "@/store";
import { getRandomInt } from "@/utils/rnd";
import {
    getNextNote,
    getNotesInKey,
    getRandomLength,
} from "@/utils/tone/generator";
import * as Tone from "tone";
import { defineComponent } from "vue";
import PlayButton from "../Buttons/PlayButton.vue";

export default defineComponent({
    name: "MainSynth",
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
                Tone.Transport.scheduleRepeat((time) => {
                    const randomNote = getNextNote();
                    const randomLength = getRandomLength();
                    const randomVelocity = getRandomInt(10, 100) / 100;
                    console.log(randomNote, randomLength, randomVelocity);

                    sampler.triggerAttackRelease(
                        randomNote,
                        randomLength,
                        time,
                        randomVelocity
                    );

                    const shortNote =
                        randomLength === "8n" ||
                        randomLength === "16n" ||
                        randomLength === "32n";

                    if (shortNote && Math.random() > 0.25) {
                        console.log("Bonus 2nd note!");
                        const randomLength2 = getRandomLength();
                        const nextTime =
                            time + Tone.Time(randomLength).toSeconds();

                        sampler.triggerAttackRelease(
                            getNextNote(),
                            randomLength2,
                            nextTime,
                            getRandomInt(10, 100) / 100
                        );

                        if (Math.random() > 0.5) {
                            console.log("Bonus 3rd note!!");
                            sampler.triggerAttackRelease(
                                getNextNote(),
                                getRandomLength(),
                                nextTime + Tone.Time(randomLength2).toSeconds(),
                                getRandomInt(10, 100) / 100
                            );
                        }
                    }
                }, "1n");
            },
            onerror(err) {
                console.error("Failed to load samples - ", err);
            },
        }).toDestination();
        store.state.notesInKeyMode = getNotesInKey("C", "dorian");
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
