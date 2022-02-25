import { Store } from "vuex";

declare module "@vue/runtime-core" {
    // declare your own store states
    interface State {
        toneReady: boolean;
        samplesReady: boolean;
        key: string;
        mode: string;
        notesInKeyMode: string[];
        lastPlayedNote: string;
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
