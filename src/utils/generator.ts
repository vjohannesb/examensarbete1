import store from "@/store";
import { Mode, Note, NoteLength, OctavedNote } from "@/types/music";
import { rndInt } from "./rnd";
import { modesTable, noteTable, weightedLengthsMap } from "./tables";

export function getRandomLength(): NoteLength {
    const index = rndInt(0, weightedLengthsMap.length);
    return weightedLengthsMap[index];
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

function nextNoteInChord(
    notes: Note[],
    previousIndex: number
): [number, OctavedNote] {
    const index = (previousIndex + 2) % notes.length;
    const octave = rndInt(3, 6);

    return [index, (notes[index] + octave) as OctavedNote];
}

export function getNextChord(): OctavedNote[] {
    const notes = store.state.notesInKeyMode;

    const octave = rndInt(3, 6);
    const rootIndex = rndInt(0, notes.length);
    const rootNote = (notes[rootIndex] + octave) as OctavedNote;
    if (Math.random() > 0.9) return [rootNote];

    const [secondIndex, secondNote] = nextNoteInChord(notes, rootIndex);
    if (Math.random() > 0.9) return [rootNote, secondNote];

    const [thirdIndex, thirdNote] = nextNoteInChord(notes, secondIndex);
    const chord = [rootNote, secondNote, thirdNote];

    const [fourthIndex, fourthNote] = nextNoteInChord(notes, thirdIndex);
    if (Math.random() > 0.75) chord.push(fourthNote);

    if (Math.random() > 0.9) {
        const [, fifthNote] = nextNoteInChord(notes, fourthIndex);
        chord.push(fifthNote);
    }

    return chord;
}

export function getNextNote(): OctavedNote {
    const notes = store.state.notesInKeyMode;
    const octave = rndInt(3, 7);
    const rndIndex = rndInt(0, notes.length);
    const note = (notes[rndIndex] + octave) as OctavedNote;

    return note;
}
