import { handleSuggestionEvent as handleSuggestionButtonEvent } from "./suggestionsButtonCallback.js";
import { handleSuggestionEvent as handleSuggestionCardEvent } from "./suggestionCardsCallback.js";
import { handleMathButtonEvent } from "./mathButtonCallback.js";

export function setupEvents() {
    const mistralButton = document.getElementById('ask-mistral-button');
    mistralButton.addEventListener('click', mistralButtonClickHandler);

}

async function mistralButtonClickHandler() {
    await handleSuggestionButtonEvent();
    suggestionCardClickHandler();
}

function suggestionCardClickHandler() {
    const learningCard = document.getElementsByClassName('suggestion-card');
    for (let i = 0; i < learningCard.length; i++) {
        learningCard[i].addEventListener('click', handleSuggestionCardEvent);
    }
}

export function handleEventListenersForMathButtons() {
    const mathButtons = document.getElementsByClassName('math');
    for (let i = 0; i < mathButtons.length; i++) {
        mathButtons[i].addEventListener('click', handleMathButtonEvent);
    }
}
