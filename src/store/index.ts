import { State } from "vue";
import { createStore } from "vuex";

export default createStore<State>({
    state: {
        toneReady: false,
        samplesReady: false,
        key: "C",
        mode: "ionian",
        notesInKeyMode: ["C", "D", "E", "F", "G", "A", "B"],
        lastPlayedNote: "C4",
        lastPlayedChord: [],
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
