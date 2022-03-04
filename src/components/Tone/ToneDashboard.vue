<template>
    <template v-if="$store.state.toneReady">
        <MainPiano />
    </template>

    <template v-else>
        <button class="btn salmon btn-init-tone" @click="initTone">
            Start
        </button>
    </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as Tone from "tone";
import store from "@/store";
import MainPiano from "./MainPiano.vue";

export default defineComponent({
    name: "ToneDashboard",
    methods: {
        initTone() {
            Tone.start().then(() => store.commit("SET_TONE_READY"));
        },
    },
    components: { MainPiano },
});
</script>

<style lang="scss"></style>
