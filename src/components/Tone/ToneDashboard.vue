<template>
    <template v-if="$store.state.toneReady">
        <ToneControls />
        <MainPiano />
        <PianoDisplay />

        <div class="notes-in-key-mode">
            <span
                v-for="(note, i) in $store.state.notesInKeyMode"
                :key="i"
                :class="noteClass(note)">
                {{ note }}
            </span>
        </div>
    </template>

    <template v-else>
        <div class="start-container">
            <button class="btn salmon btn-init-tone" @click="initTone">
                Start
            </button>
        </div>
    </template>
</template>

<script lang="ts">
// imports...
import { defineComponent } from "vue";
import * as Tone from "tone";
import store from "@/store";
import MainPiano from "./MainPiano.vue";
import { noteTable, modesTable } from "@/utils/tables";
import { Note } from "@/types/music";
import ToneControls from "./ToneControls.vue";
import PianoDisplay from "./PianoDisplay.vue";

export default defineComponent({
    name: "ToneDashboard",
    components: { MainPiano, ToneControls, PianoDisplay },
    setup() {
        return { noteTable, modesTable, Tone };
    },
    methods: {
        async initTone() {
            await Tone.start();
            store.commit("SET_TONE_READY");
        },
        noteClass(note: Note) {
            const lastPlayed = this.$store.state.lastPlayedNote as string;
            return {
                "last-note":
                    note == lastPlayed.substring(0, lastPlayed.length - 1),
                "in-chord":
                    this.$store.state.lastPlayedChord.join().indexOf(note) !=
                    -1,
            };
        },
    },
});
</script>

<style lang="scss">
.start-container {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .btn-init-tone {
        font-size: 2rem;
    }
}

select {
    background: #18181a;
    border: 2px solid white;
    border-radius: 4px;
    padding: 0.5rem;
    color: white;
    margin: 0.5rem;
}

.notes-in-key-mode {
    display: flex;
    justify-content: center;
    gap: 1rem;

    span {
        width: 3rem;
        height: 3rem;
        border: 2px solid transparent;
        border-radius: 4px;
        line-height: 3rem;
        position: relative;
        transition: color 0.5s;

        &::after {
            content: "";
            position: absolute;
            top: -2px;
            left: -2px;
            width: 100%;
            height: 100%;
            border-top: 4px solid transparent;
            border-left: 4px solid transparent;
            border-radius: 8px;
            transition: border-color 0.5s;
        }

        &::before {
            content: "";
            position: absolute;
            top: -2px;
            left: -2px;
            width: 100%;
            height: 100%;
            border-bottom: 4px solid transparent;
            border-right: 4px solid transparent;
            border-radius: 8px;
            transition: border-color 0.5s;
        }

        &.last-note {
            color: hsl(0, 50%, 50%);
            &::after {
                border-color: hsl(0, 50%, 50%);
            }
        }

        &.in-chord {
            color: hsl(60, 50%, 50%);
            &::before {
                border-color: hsl(60, 50%, 50%);
            }
        }

        &.in-chord.last-note {
            color: hsl(39, 100%, 50%);
        }
    }
}
</style>
