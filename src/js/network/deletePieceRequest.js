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

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        await handleProgression(completed_piece);
    } catch (error) {
        console.error('Error deleting piece:', error);
    }
}

async function handleProgression(data) {
    console.log("Handling progression for deleted piece:", data);
    const levelData = await getLevelData();
    console.log("Level data:", levelData);
    let experience = levelData[0].experience;
    let lvl = levelData[0].level;
    console.log("Current experience:", experience, "Current level:", lvl);
    const expLess = 100 / data.timeToPlay;
    const expGained = expLess * data.timePlayed;
    experience -= expGained;
    lvl = Math.floor(experience / 100);
    const json = {
        level: lvl,
        experience: experience
    }
   await updateProgression(json); 
}
