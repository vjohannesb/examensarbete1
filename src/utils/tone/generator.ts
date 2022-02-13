export const noteTable: Note[] = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
];

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

export const modesTable: ModeTable = {
    ionian: [0, 2, 4, 5, 7, 9, 11], // major
    dorian: [0, 2, 3, 5, 7, 9, 10], // minor
    phrygian: [0, 1, 3, 5, 7, 8, 10], // minor
    lydian: [0, 2, 4, 6, 7, 9, 11], // major
    mixolydian: [0, 2, 4, 5, 7, 9, 10], // major
    aeolian: [0, 2, 3, 5, 7, 8, 10], // minor
    locrian: [0, 1, 3, 5, 6, 8, 10], // minor
};

export function getNotesInKey(root: Note, mode: Mode) {
    const index = noteTable.indexOf(root);
    const selectedMode = modesTable[mode];

    const notes = selectedMode.map(
        (n) => noteTable[(index + n) % noteTable.length]
    );
    console.log(notes);
    return notes;
}

export function getNextTone(prev: string): string {
    return prev + 1;
}
