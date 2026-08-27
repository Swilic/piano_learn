import { createNewPieceInput } from "../../builders/newPieceInput.js";
import { hideContent } from "../../components/progression/hideContent.js";
import { handleAddNewCardEvent, handleCancelNewCardEvent } from "./inputCard/newInputCardButtonCallback.js";

export async function handleAddCardEvent(event) {
    event.preventDefault();
    const newPiece = createNewPieceInput();
    hideContent();
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(newPiece);
    setupNewPieceInputEvents(newPiece);
}

function setupNewPieceInputEvents(newPiece) {
    const validateButton = newPiece.querySelector('.validate-button');
    const cancelButton = newPiece.querySelector('.cancel-button');
    validateButton.addEventListener('click', handleAddNewCardEvent);
    cancelButton.addEventListener('click', handleCancelNewCardEvent);

}
