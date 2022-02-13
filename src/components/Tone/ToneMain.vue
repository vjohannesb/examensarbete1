<template>
    <h1>TONE</h1>
    <template v-if="$store.state.toneReady">
        <ToneDashboard />
    </template>

    <template v-else>
        <button class="btn btn-init-tone" @click="initTone">Start</button>
    </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as Tone from "tone";
import store from "@/store";
import ToneDashboard from "./ToneDashboard.vue";

export default defineComponent({
    name: "ToneMain",
    methods: {
        initTone() {
            Tone.start().then(() => store.commit("SET_TONE_READY"));
        },
    },
    components: { ToneDashboard },
});
</script>

<style lang="scss"></style>
