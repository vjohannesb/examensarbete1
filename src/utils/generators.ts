import store from "@/store";

export function generateChord(): string[] {
    const notes = store.state.notesInKeyMode;

    // Between 3 and 6
    let octave = Math.floor(Math.random() * 3) + 3;

    const rootIndex = Math.floor(Math.random() * notes.length);
    const rootNote = notes[rootIndex] + octave;

    const secondIndex = (rootIndex + 2) % notes.length;
    if (secondIndex < rootIndex) octave += 1;
    const secondNote = notes[secondIndex] + octave;

    const thirdIndex = (secondIndex + 2) % notes.length;
    if (thirdIndex < secondIndex) octave += 1;
    const thirdNote = notes[thirdIndex] + octave;

    const chord = [rootNote, secondNote, thirdNote];

    if (Math.random() > 0.5) {
        const fourthIndex = (thirdIndex + 2) % notes.length;
        if (fourthIndex < thirdIndex) octave += 1;
        const fourthNote = notes[fourthIndex] + octave;

        chord.push(fourthNote);

        if (Math.random() > 0.5) {
            const fifthIndex = (fourthIndex + 2) % notes.length;
            if (fifthIndex < thirdIndex) octave += 1;
            const fifthNote = notes[fifthIndex] + octave;

            chord.push(fifthNote);
        }
    }
    return chord;
}

export function getNextNote(): string {
    const notes = store.state.notesInKeyMode;
    const octave = Math.floor(Math.random() * 3) + 3;

    const rndIndex = Math.floor(Math.random() * notes.length);
    return notes[rndIndex] + octave;
}
