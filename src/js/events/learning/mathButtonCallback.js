import { updatePiece } from "../../network/updatePieceRequest.js";
import { updateProgression } from "../../network/updateProgression.js";
import { getLevelData } from "../../repositories/progressionData.js";

const experiencePerLevel = 100;

export async function handleMathButtonEvent(event) {
    const [currentTimePlayed, value] = computeNewTimePlayed(event);
    updateTimePlayedInView(currentTimePlayed);
    updateSessionStorage(currentTimePlayed);
    prepareAndSendUpdateRequest();
    if (currentTimePlayed === 0) {
        return;
    }
    const gainExperience = computeExperienceGain(value);
    const progressionData = await getLevelData();
    const progressionUpdate = applyExperienceGain(progressionData, gainExperience);
    updateProgression(progressionUpdate);
}

function computeNewTimePlayed(event) {
    const parentElement = event.currentTarget.parentElement;
    const activeCard = parentElement.querySelector('.active-card');
    const value = event.currentTarget.classList.contains('add') ? 1 : -1;
    const timePlayedElement = activeCard.querySelector('.time-played');
    let currentTimePlayed = parseInt(timePlayedElement.textContent.replace('Time played: ', ''));
    currentTimePlayed += value;
    if (currentTimePlayed < 0) {
        currentTimePlayed = 0;
    }
    return [currentTimePlayed, value];
}

function updateTimePlayedInView(currentTimePlayed) {
    const timePlayedElement = document.querySelector('.time-played');
    if (timePlayedElement) {
        timePlayedElement.textContent = `Time played: ${currentTimePlayed}`;
    }
}

function updateSessionStorage(currentTimePlayed) {
    const completedPieces = JSON.parse(sessionStorage.getItem("activePiece")) || {};
    completedPieces.timePlayed = currentTimePlayed;
    sessionStorage.setItem('activePiece', JSON.stringify(completedPieces));
}

function prepareAndSendUpdateRequest() {
    const completedPieces = JSON.parse(sessionStorage.getItem("activePiece"));
    if (!completedPieces) {
        console.error("No active piece found in session storage.");
        return;
    }
    const updateData = {
        composer: completedPieces.composer,
        title: completedPieces.title,
        time_played: completedPieces.timePlayed,
        time_to_play: completedPieces.timeToPlay
    };
    updatePiece(updateData);
}

function computeExperienceGain(value) {
    const completedPieces = JSON.parse(sessionStorage.getItem("activePiece"));
    const timeToPlay = completedPieces.timeToPlay;
    if (timeToPlay === 0) {
        return 0;
    }
    return (experiencePerLevel / timeToPlay) * value;
}

function applyExperienceGain(progressionData, gainExperience) {
    const newExperience = progressionData[0].experience + gainExperience;
    const newLevel = Math.floor(newExperience / experiencePerLevel);
    return {
        level: Math.max(1, newLevel),
        experience: Math.max(0, newExperience)
    };
}
