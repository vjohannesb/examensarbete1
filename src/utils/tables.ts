import { ModeTable, Weighted, NoteLength, Note } from "@/types/music";

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

export const modesTable: ModeTable = {
    ionian: [0, 2, 4, 5, 7, 9, 11], // major
    dorian: [0, 2, 3, 5, 7, 9, 10], // minor
    phrygian: [0, 1, 3, 5, 7, 8, 10], // minor
    lydian: [0, 2, 4, 6, 7, 9, 11], // major
    mixolydian: [0, 2, 4, 5, 7, 9, 10], // major
    aeolian: [0, 2, 3, 5, 7, 8, 10], // minor
    locrian: [0, 1, 3, 5, 6, 8, 10], // minor
};

export const weightedLengths: Weighted<NoteLength>[] = [
    {
        value: "1n",
        weight: 2,
    },
    {
        value: "2n",
        weight: 2,
    },
    {
        value: "4n",
        weight: 3,
    },
    {
        value: "8n",
        weight: 2,
    },
    {
        value: "16n",
        weight: 1,
    },
    {
        value: "32n",
        weight: 1,
    },
];

export const weightedLengthsMap: NoteLength[] = weightedLengths.flatMap((v) => {
    const lengths: NoteLength[] = [];
    for (let i = 0; i < v.weight; i++) lengths.push(v.value);
    return lengths;
});
