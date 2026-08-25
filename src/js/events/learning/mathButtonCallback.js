import { updatePiece } from "../../network/updatePieceRequest.js";

export async function handleMathButtonEvent(event) {
    const parentElement = event.currentTarget.parentElement;
    const activeCard = parentElement.querySelector('.active-card');
    const value = event.currentTarget.classList.contains('add') ? 1 : -1;
    const timePlayedElement = activeCard.querySelector('.time-played');
    let currentTimePlayed = parseInt(timePlayedElement.textContent.replace('Time played: ', ''));
    currentTimePlayed += value;
    if (currentTimePlayed < 0) {
        currentTimePlayed = 0;
    }
    timePlayedElement.textContent = `Time played: ${currentTimePlayed}`;
    const completedPieces = JSON.parse(sessionStorage.getItem("activePiece")) || {};
    completedPieces.timePlayed = currentTimePlayed;
    sessionStorage.setItem('activePiece', JSON.stringify(completedPieces));
    const completed_piece = {
        composer: completedPieces.composer,
        title: completedPieces.title,
        time_played: currentTimePlayed,
    };
    updatePiece(completed_piece);
}
