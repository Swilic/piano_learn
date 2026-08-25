import { createActiveCard } from "../builders/learningCard.js";
import { handleEventListenersForMathButtons } from "../events/learning/setupEvents.js";

export function handleBooting() {
    const startActiveCard = sessionStorage.getItem('activeProgressionCard');
    if (startActiveCard === 'true') {
        sessionStorage.removeItem('activeProgressionCard');
        createActiveCard();
        handleEventListenersForMathButtons();
    }
}
