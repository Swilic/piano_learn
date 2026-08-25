import { askMistralForSuggestions } from "../../network/mistralSuggestions.js";
import { clearActiveCard } from "./suggestionCardsCallback.js";

export async function handleSuggestionEvent() {
    clearActiveCard();
    const data = await askMistralForSuggestions();
    const message = parseRecommendationData(data).recommandations;

    for (let i = 0; i < 3; i++) {
        const suggestedPiece = message[i];
        const paragraph = createSuggestionCard(suggestedPiece);
        document.getElementById('content-suggestion').appendChild(paragraph);
    }
}

function createSuggestionCard(suggestedPiece) {
    const paragraph = document.createElement('div');
    paragraph.classList.add('suggestion-card');
    const [composer, title, timePlayed, reasoning, advice] = createEachElementInSuggestionCard(suggestedPiece);
    appendSuggestionCards(paragraph, [composer, title, timePlayed, reasoning, advice]);
    return paragraph;
}

function createEachElementInSuggestionCard(suggestedPiece) {
    const composer = document.createElement('li');
    composer.classList.add('composer');
    composer.textContent = `Composer: ${suggestedPiece.composer}`;
    const title = document.createElement('li');
    title.classList.add('title');
    title.textContent = `Title: ${suggestedPiece.title}`;
    const timePlayed = document.createElement('li');
    timePlayed.classList.add('time-played');
    timePlayed.textContent = `Time to play: ${suggestedPiece.times_to_play}`;
    const reasoning = document.createElement('li');
    reasoning.classList.add('reasoning');
    reasoning.textContent = `Pourquoi: ${suggestedPiece.reason}`;
    const advice = document.createElement('li');
    advice.classList.add('advice');
    advice.textContent = `Conseil: ${suggestedPiece.conseil}`;
    return [composer, title, timePlayed, reasoning, advice];
}

function appendSuggestionCards(paragraph, suggestions) {
    suggestions.forEach(suggestion => {
        paragraph.appendChild(suggestion);
    });
}

function parseRecommendationData(data) {
    const cleanedResponse = data
        .replace(/^```json\s*/, "")
        .replace(/\s*```$/, "");
    return JSON.parse(cleanedResponse);
}

export function clearPreviousSuggestions() {
    const contentSuggestion = document.getElementById('content-suggestion');
    while (contentSuggestion.firstChild) {
        contentSuggestion.removeChild(contentSuggestion.firstChild);
    }
}
