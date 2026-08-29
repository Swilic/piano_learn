import { getLevelData } from "../repositories/progressionData.js";
import { updateProgression } from "./updateProgression.js";

export async function deletePieceRequest(completed_piece) {
    try {
        const response = await fetch('https://pianolearn.diamankazberuk.workers.dev/progression/pieces', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(completed_piece)
        });
        handleProgression(completed_piece);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error deleting piece:', error);
    }
}

async function handleProgression(data) {
    console.log("Handling progression for deleted piece:", data);
    let lvl, experience = await getLevelData();
    const expLess = 100 / data.time_to_play;
    const expGained = expLess * data.time_played;
    experience -= expGained;
    lvl = Math.floor(experience / 100);
    const json = {
        level: lvl,
        experience: experience
    }
   updateProgression(json); 
}
