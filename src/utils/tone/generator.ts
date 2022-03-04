import store from "@/store";
import {
    Mode,
    ModeTable,
    Note,
    NoteLength,
    OctavedNote,
    Weighted,
} from "@/types/music";
import * as Tone from "tone";
import {
    Instrument,
    InstrumentOptions,
} from "tone/build/esm/instrument/Instrument";
import { rndInt } from "../rnd";

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
        weight: 1,
    },
    {
        value: "2n",
        weight: 2,
    },
    {
        value: "4n",
        weight: 4,
    },
    {
        value: "8n",
        weight: 8,
    },
    {
        value: "16n",
        weight: 16,
    },
    {
        value: "32n",
        weight: 2,
    },
];

export const weightedLengthsMap: NoteLength[] = weightedLengths.flatMap((v) => {
    const lengths: NoteLength[] = [];
    for (let i = 0; i < v.weight; i++) lengths.push(v.value);
    return lengths;
});

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

export function generateChord(): OctavedNote[] {
    const notes = store.state.notesInKeyMode;

    let octave = rndInt(3, 7);
    const rootIndex = rndInt(0, notes.length);
    const rootNote = (notes[rootIndex] + octave) as OctavedNote;

    const secondIndex = (rootIndex + 2) % notes.length;
    if (secondIndex < rootIndex) octave += 1;
    const secondNote = (notes[secondIndex] + octave) as OctavedNote;

    const thirdIndex = (secondIndex + 2) % notes.length;
    if (thirdIndex < secondIndex) octave += 1;
    const thirdNote = (notes[thirdIndex] + octave) as OctavedNote;

    const chord: OctavedNote[] = [rootNote, secondNote, thirdNote];

    if (Math.random() > 0.5) {
        const fourthIndex = (thirdIndex + 2) % notes.length;
        if (fourthIndex < thirdIndex) octave += 1;
        const fourthNote = (notes[fourthIndex] + octave) as OctavedNote;

        chord.push(fourthNote);

        if (Math.random() > 0.5) {
            const fifthIndex = (fourthIndex + 2) % notes.length;
            if (fifthIndex < thirdIndex) octave += 1;
            const fifthNote = (notes[fifthIndex] + octave) as OctavedNote;

            chord.push(fifthNote);
        }
    }

    store.state.lastPlayedChord = chord;
    return chord as OctavedNote[];
}

export function getNextNote(): OctavedNote {
    const notes = store.state.notesInKeyMode;
    const octave = rndInt(3, 7);
    const rndIndex = rndInt(0, notes.length);
    const note = (notes[rndIndex] + octave) as OctavedNote;

    store.state.lastPlayedNote = note;
    return note;
}

export function scheduler(
    instrument: Instrument<InstrumentOptions>,
    generator: () => OctavedNote | OctavedNote[]
): void {
    const randomLength = getRandomLength();
    Tone.Transport.scheduleRepeat((time) => {
        const result = generator();
        const rndLength = getRandomLength();

        if (Array.isArray(result)) {
            for (const note of result) {
                const rndVelocity = rndInt(10, 100) / 100;
                instrument.triggerAttackRelease(
                    note,
                    rndLength,
                    time,
                    rndVelocity
                );
            }
        } else {
            const rndVelocity = rndInt(10, 100) / 100;
            instrument.triggerAttackRelease(
                result,
                rndLength,
                time,
                rndVelocity
            );

            if (Math.random() > 0.5) {
                const rndVelocity = rndInt(10, 100) / 100;
                const secondNote = generator();
                instrument.triggerAttackRelease(
                    secondNote as string,
                    rndLength,
                    Tone.Time(rndLength).toSeconds() + time,
                    rndVelocity
                );
            }
        }
        Tone.Transport.schedule(self, time);
    }, "1n");
}
