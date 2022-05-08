<template>
    <select @change="updateSelectedKey($event)">
        <option
            v-for="(key, i) in noteTable"
            :key="i"
            :value="key"
            :selected="key === $store.state.key">
            {{ key }}
        </option>
    </select>

    <select @change="updateSelectedMode($event)">
        <option
            v-for="(_, mode, i) in modesTable"
            :key="i"
            :value="mode"
            :selected="mode === $store.state.mode">
            {{ mode }}
        </option>
    </select>

    <div class="d-flex justify-center align-center">
        <span>🔈</span>
        <input
            type="range"
            v-model="$store.state.volume.volume.value"
            min="-60"
            max="0"
            step="0.1" />
        <span>🔊</span>
    </div>
    <p>{{ transportTime }}s</p>
</template>

<script lang="ts">
import store from "@/store";
import { Mode } from "@/types/music";
import { modesTable, noteTable } from "@/utils/tables";
import * as Tone from "tone";
import { Note } from "tone/build/esm/core/type/NoteUnits";
import { defineComponent } from "vue";

export default defineComponent({
    name: "ToneControls",
    setup() {
        return { noteTable, modesTable };
    },
    data() {
        return {
            transportTime: "0",
        };
    },
    mounted() {
        setInterval(() => {
            this.transportTime = Tone.Transport.seconds.toFixed(0);
        }, 100);
    },
    methods: {
        updateSelectedKey(event: Event) {
            const target = event.target as HTMLSelectElement;
            store.dispatch("changeKey", target.value as Note);
        },
        updateSelectedMode(event: Event) {
            const target = event.target as HTMLSelectElement;
            store.dispatch("changeMode", target.value as Mode);
        },
    },
});
</script>
