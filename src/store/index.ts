import { createStore } from "vuex";

export default createStore({
    state: {
        toneReady: false,
        samplesReady: false,
        key: "C",
        mode: "ionian",
        notesInKeyMode: ["C", "D", "E", "F", "G", "A", "B"],
        lastPlayedNote: "C",
    },
    mutations: {
        SET_TONE_READY(state) {
            state.toneReady = true;
        },
        RESET_TONE(state) {
            state.toneReady = false;
        },
    },
    actions: {},
    modules: {},
});
