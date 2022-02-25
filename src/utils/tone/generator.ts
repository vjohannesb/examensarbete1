import store from "@/store";
import {
    Mode,
    ModeTable,
    Note,
    NoteLength,
    NoteLengthTable,
} from "@/types/music";
import { getRandomInt } from "../rnd";

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

export const lengthTable: NoteLengthTable = [
    "32n",
    "16n",
    "16n",
    "8n",
    "8n",
    "8n",
    "8n",
    "4n",
    "4n",
    "4n",
    "4n",
    "4n",
    "2n",
    "1n",
];

export function getRandomLength(): NoteLength {
    const index = getRandomInt(0, lengthTable.length);
    return lengthTable[index];
}

export function getNotesInKey(root: Note, mode: Mode): Note[] {
    const index = noteTable.indexOf(root);
    const selectedMode = modesTable[mode];

    const notes = selectedMode.map(
        (n) => noteTable[(index + n) % noteTable.length]
    );
    console.log(notes);
    return notes;
}

export function getNextNote(): string {
    const notesInKeyMode = store.state.notesInKeyMode;
    const randomInt = getRandomInt(0, notesInKeyMode.length);
    const randomOctave = getRandomInt(4, 6);
    const randomNote = notesInKeyMode[randomInt];
    store.state.lastPlayedNote = randomNote;
    return `${randomNote}${randomOctave}`;
}
