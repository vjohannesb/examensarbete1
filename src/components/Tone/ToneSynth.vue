<template>
    <h1>Synth</h1>
    <div class="note-buttons">
        <button
            v-for="note in notes"
            :key="note"
            class="btn btn-note"
            type="button"
            @click="playNote($event, note)">
            {{ note }}
        </button>
    </div>
</template>

<script lang="ts">
import * as Tone from "tone";
import { defineComponent } from "vue";

export default defineComponent({
    name: "ToneSynth",
    setup() {
        const notes = [
            "C",
            "C#",
            "D",
            "D#",
            "E",
            "F",
            "F#",
            "G",
            "G#",
            "A",
            "A#",
            "B",
        ];
        const synth = new Tone.Synth({
            envelope: { attack: 0.01, release: 1 },
            oscillator: { type: "fatsine1", phase: 90 },
        }).toDestination();
        return { notes, synth };
    },
    methods: {
        playNote(event: MouseEvent, note: string) {
            console.log(event);
            const target = event.target as HTMLElement;
            target.classList.remove("animate-after");
            setTimeout(() => target.classList.add("animate-after"), 1);
            const now = Tone.now();
            const tone = note + "4";
            this.synth.triggerAttackRelease(tone, "8n", now);
        },
    },
});
</script>

<style lang="scss">
.note-buttons {
    display: flex;
    flex-direction: row;

    .btn-note {
        position: relative;
        margin: 0 1rem;
        border: 2px solid salmon;
        border-radius: 4px;
        background: none;
        padding: 1rem;

        &:hover {
            cursor: pointer;
            color: white;
            background: salmon;
        }

        &::after {
            content: "";
            width: 100%;
            height: 100%;
            position: absolute;
            border: 2px solid salmon;
            border-radius: 4px;
            top: 0;
            left: 0;
            opacity: 0;
        }

        &.animate-after::after {
            animation: ClickedNote 1s ease-out forwards;
        }
    }
}

@keyframes ClickedNote {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    100% {
        transform: scale(2);
        opacity: 0;
    }
}
</style>
