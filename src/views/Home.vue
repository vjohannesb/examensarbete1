<template>
    <ToneDashboard />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ToneDashboard from "@/components/Tone/ToneDashboard.vue";

export default defineComponent({
    name: "Home",
    components: { ToneDashboard },
});
</script>
