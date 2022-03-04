export function rndInt(min: number, max: number, inclusive = false): number {
    if (inclusive) return Math.floor(Math.random() * (max - min + 1)) + min;
    return Math.floor(Math.random() * (max - min) + min);
}
