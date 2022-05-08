import { Sampler } from "tone";
import * as Tone from "tone";
import { getRandomLength, getNextNote, getNextChord } from "./generator";
import { rndVelocity } from "./rnd";
import store from "@/store";

export function scheduleNotes(sampler: Sampler): void {
    const note = getNextNote();
    const noteLength = getRandomLength();
    const noteVelocity = rndVelocity();

    Tone.Transport.scheduleOnce(() => {
        sampler.triggerAttackRelease(note, noteLength, "+0", noteVelocity);
        store.state.lastPlayedNote = note;
    }, "+0");

    scheduleNextNote(sampler);
}

export function scheduleChords(sampler: Sampler): void {
    const notes = getNextChord();
    const noteVelocity = rndVelocity();
    Tone.Transport.scheduleOnce(() => {
        sampler.triggerAttackRelease(notes, "1n", "+0", noteVelocity);
        store.state.lastPlayedChord = notes;
    }, "+0");

    scheduleNextChord(sampler);
}

function scheduleNextNote(sampler: Sampler): void {
    const randomInterval = getRandomLength();
    Tone.Transport.scheduleOnce((time) => {
        const note = getNextNote();
        const noteLength = getRandomLength();
        const noteVelocity = rndVelocity();

        sampler.triggerAttackRelease(note, noteLength, time, noteVelocity);

        store.state.lastPlayedNote = note;
        scheduleNextNote(sampler);
    }, `+${randomInterval}`);
}

function scheduleNextChord(sampler: Sampler): void {
    const randomLength =
        Math.random() > 0.25 ? "1n" : Math.random() > 0.25 ? "2n" : "4n";

    Tone.Transport.scheduleOnce((time) => {
        const notes = getNextChord();
        const noteVelocity = rndVelocity();

        sampler.triggerAttackRelease(notes, randomLength, time, noteVelocity);

        store.state.lastPlayedChord = notes;
        scheduleNextChord(sampler);
    }, `+${randomLength}`);
}
