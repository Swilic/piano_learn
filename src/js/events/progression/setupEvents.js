import { handleSuggestionEvent } from "./cardProgressionCallback.js";

export async function setupEvents() {
    const cards = document.getElementsByClassName('card-progression');
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', handleSuggestionEvent);
    }
}
