import { createStore } from "vuex";

export default createStore({
    state: {
        toneReady: false,
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
