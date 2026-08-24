import { progressionDataPath } from "../variables/path.js";

export async function loadProgression() {
    const response = await fetch(progressionDataPath);
    return response.json();
}
