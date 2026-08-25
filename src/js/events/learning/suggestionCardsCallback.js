import { clearPreviousSuggestions } from "./suggestionsButtonCallback.js";
import { savePiece } from "../../network/addPieceRequest.js";
import { loadProgression, checkIfPieceAlreadyCompleted } from "../../repositories/progressionData.js";
import { handleMathButtonEvent } from "./mathButtonCallback.js";
import { createActiveCard } from "../../builders/learningCard.js";

export async function handleSuggestionEvent(event) {
    clearPreviousSuggestions();
    const jsonData = await parseSelectedCardData(event.currentTarget);
    savePieceSessionStorage(jsonData);
    createActiveCard()
    sendRequestToDatabase(jsonData);
    handleEventListenersForMathButtons();
}

async function parseSelectedCardData(selectedCard) {
    const composer = selectedCard.querySelector('.composer').textContent.slice("Composer: ".length);
    const title = selectedCard.querySelector('.title').textContent.slice("Title: ".length);
    const completedPieces = await loadProgression();
    const timePlayed = checkIfPieceAlreadyCompleted({ composer, title }, completedPieces.completedPieces);
    return { composer, title, timePlayed: timePlayed.timePlayed };
}

function handleEventListenersForMathButtons() {
    const mathButtons = document.getElementsByClassName('math');
    for (let i = 0; i < mathButtons.length; i++) {
        mathButtons[i].addEventListener('click', handleMathButtonEvent);
    }
}

function savePieceSessionStorage(jsonData) {
    const completed_piece = {
        composer: jsonData.composer,
        title: jsonData.title,
        timePlayed: jsonData.timePlayed,
    };
    sessionStorage.setItem('activePiece', JSON.stringify(completed_piece));
}

// BACKEND PART
function sendRequestToDatabase(jsonData) {
    const completed_piece = {
        composer: jsonData.composer,
        title: jsonData.title,
        time_played: 0,
    };
    savePiece(completed_piece);
}

export function clearActiveCard() {
    const contentActiveCard = document.getElementsByClassName('content-active-card')[0];
    while (contentActiveCard.firstChild) {
        contentActiveCard.removeChild(contentActiveCard.firstChild);
    }
    sessionStorage.removeItem('activePiece');
}
