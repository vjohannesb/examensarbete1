<template>
    <div class="piano-display" :class="{ loading: !$store.state.samplesReady }">
        <div class="piano-octave" v-for="i in 5" :key="i">
            <span class="white-key" :class="noteColor('C' + (i + 2))">
                C{{ i + 2 }}
            </span>
            <span class="black-key" :class="noteColor('C#' + (i + 2))" />
            <span class="white-key" :class="noteColor('D' + (i + 2))" />
            <span class="black-key" :class="noteColor('D#' + (i + 2))" />
            <span class="white-key" :class="noteColor('E' + (i + 2))" />
            <span class="white-key" :class="noteColor('F' + (i + 2))" />
            <span class="black-key" :class="noteColor('F#' + (i + 2))" />
            <span class="white-key" :class="noteColor('G' + (i + 2))" />
            <span class="black-key" :class="noteColor('G#' + (i + 2))" />
            <span class="white-key" :class="noteColor('A' + (i + 2))" />
            <span class="black-key" :class="noteColor('A#' + (i + 2))" />
            <span class="white-key" :class="noteColor('B' + (i + 2))" />
        </div>
    </div>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent } from "vue";

export default defineComponent({
    name: "PianoDisplay",
    methods: {
        noteColor(octavedNote: string) {
            const notesInKeyMode = store.state.notesInKeyMode.join();
            const lastChord = store.state.lastPlayedChord.join();
            const note = octavedNote.substring(0, octavedNote.length - 1);
            return {
                "in-key-mode": notesInKeyMode.includes(note),
                "played-note": store.state.lastPlayedNote == octavedNote,
                "in-chord": lastChord.includes(octavedNote),
            };
        },
    },
});
</script>

<style lang="scss" scoped>
.piano-display {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    margin-top: 1rem;
    overflow: hidden;

    .piano-octave {
        display: flex;

        span {
            border: 2px solid transparent;
            transition: all 500ms;
        }

        .white-key {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            color: black;
            font-size: 0.5rem;
            width: 20px;
            height: 50px;
            background: gray;
            transform: scale(1);

            &.in-key-mode {
                background: white;
            }
        }

        .black-key {
            width: 20px;
            height: 25px;
            margin-left: -10px;
            margin-right: -10px;
            background: gray;
            transform: scale(1);

            &.in-key-mode {
                background: black;
            }
        }

        .played-note {
            background: pink !important;
        }

        .in-chord {
            background: hsl(150, 25%, 52%) !important;
        }

        .played-note.in-chord {
            background: hsl(180, 62%, 65%) !important;
        }
    }
}
</style>
