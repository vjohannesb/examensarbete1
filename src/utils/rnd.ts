export function rndInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export function rndVelocity(min = 10, max = 100): number {
    return rndInt(min, max) / max;
}
