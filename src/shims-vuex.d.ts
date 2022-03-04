import { Store } from "vuex";
import { Mode, Note, OctavedNote } from "./types/music";

declare module "@vue/runtime-core" {
    interface State {
        toneReady: boolean;
        samplesReady: boolean;
        key: Note;
        mode: Mode;
        notesInKeyMode: Note[];
        lastPlayedNote: OctavedNote;
        lastPlayedChord: OctavedNote[];
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}
