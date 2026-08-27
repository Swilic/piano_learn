import { showContent } from "../../../components/progression/hideContent.js";
import { savePiece } from "../../../network/addPieceRequest.js";

export async function handleAddNewCardEvent(event) {
    event.preventDefault();
    const newPiece = document.getElementsByClassName('new-piece-input-container');
    if (!checkIfCorrectInput(newPiece)) {
        console.error('Title or content input is empty. Please fill in both fields.');
        return;
    }
    const inputJson = getInputJson(newPiece);
    await savePiece(inputJson);
    window.location.reload();
}

function checkIfCorrectInput(newPiece) {
    const titleInput = newPiece[0].querySelector('.composer-input');
    const contentInput = newPiece[0].querySelector('.title-input');
    if (titleInput.value.trim() === '' || contentInput.value.trim() === '') {
        return false;
    }
    return true;
}

function getInputJson(newPiece) {
    const composerInput = newPiece[0].querySelector('.composer-input');
    const titleInput = newPiece[0].querySelector('.title-input');
    let timePlayedInput = newPiece[0].querySelector('.time-played-input');
    timePlayedInput = parseInt(timePlayedInput.value.trim(), 10);
    if (isNaN(timePlayedInput)) {
        timePlayedInput = 0;
    }

    const inputJson = {
        composer: composerInput.value.trim(),
        title: titleInput.value.trim(),
        time_played: timePlayedInput,
        time_to_play: 15
    };

    return inputJson;
}

export function handleCancelNewCardEvent(event) {
    event.preventDefault();
    const newPiece = document.getElementsByClassName('new-piece-input-container');
    if (newPiece) {
        const parent = newPiece[0].parentNode;
        for (let i = 0; i < newPiece.length; i++) {
            parent.removeChild(newPiece[i]);
        }
    }
    showContent();
}
