export type Note =
    | "C"
    | "C#"
    | "D"
    | "D#"
    | "E"
    | "F"
    | "F#"
    | "G"
    | "G#"
    | "A"
    | "A#"
    | "B";

export type Mode =
    | "ionian"
    | "dorian"
    | "phrygian"
    | "lydian"
    | "mixolydian"
    | "aeolian"
    | "locrian";

export type ModeTable = {
    [mode in keyof Mode as Mode]: number[];
};

export type NoteLength = "32n" | "16n" | "8n" | "4n" | "2n" | "1n";

export type Weighted<T> = {
    value: T;
    weight: number;
};

export type OctavedNote = `${Note}${number}`;
