import { Mode, Note } from "@/types/music";
import { getNotesInKey } from "@/utils/generator";
import { Volume } from "tone";
import { State } from "vue";
import { createStore } from "vuex";

export default createStore<State>({
    state: {
        toneReady: false,
        samplesReady: false,
        volume: new Volume(-12).toDestination(),
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
        CHANGE_KEY(state, key: Note) {
            state.key = key;
        },
        CHANGE_MODE(state, mode: Mode) {
            state.mode = mode;
        },
        UPDATE_NOTES(state) {
            state.notesInKeyMode = getNotesInKey(state.key, state.mode);
        },
    },
    actions: {
        changeKey({ commit }, key) {
            commit("CHANGE_KEY", key);
            commit("UPDATE_NOTES");
        },
        changeMode({ commit }, mode) {
            commit("CHANGE_MODE", mode);
            commit("UPDATE_NOTES");
        },
    },
    modules: {},
});
