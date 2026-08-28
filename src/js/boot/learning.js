import { createActiveCard } from "../builders/learningCard.js";
import { handleEventListenersForMathButtons } from "../events/learning/setupEvents.js";
import { showActiveCard } from "../events/learning/suggestionCardsCallback.js";

export function handleBooting() {
    const startActiveCard = sessionStorage.getItem('activeProgressionCard');
    if (startActiveCard === 'true') {
        sessionStorage.removeItem('activeProgressionCard');
        createActiveCard();
        showActiveCard()
        handleEventListenersForMathButtons();
    }
}
