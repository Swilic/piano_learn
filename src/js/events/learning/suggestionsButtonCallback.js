import { askMistralForSuggestions } from "../../network/mistralSuggestions.js";
import { clearActiveCard } from "./suggestionCardsCallback.js";

export async function handleSuggestionEvent() {
    clearActiveCard();
    showSuggestionCards();
    // const data = await askMistralForSuggestions();
    // const message = parseRecommendationData(data).recommandations;
    const message = [{ 
        composer: "Ludwig van Beethoven", title: "Moonlight Sonata", time_to_play: 5, reason: "It's a beautiful piece that will improve your finger strength.", advice: "Focus on the dynamics and expression." }];

    for (let i = 0; i < message.length; i++) {
        const suggestedPiece = message[i];
        const paragraph = createSuggestionCard(suggestedPiece);
        document.getElementById('content-suggestion').appendChild(paragraph);
    }
}

function parseRecommendationData(data) {
    const cleanedResponse = data
        .replace(/^```json\s*/, "")
        .replace(/\s*```$/, "");

    return JSON.parse(cleanedResponse);
}

function createSuggestionCard(suggestedPiece) {
    const paragraph = document.createElement('div');
    paragraph.classList.add('suggestion-card');
    const elements = createEachElementInSuggestionCard(suggestedPiece);
    appendSuggestionCards(paragraph, elements);
    return paragraph;
}

function createEachElementInSuggestionCard(suggestedPiece) {
    const composer = document.createElement('li');
    composer.classList.add('composer');
    composer.textContent = `Composer: ${suggestedPiece.composer}`;
    const title = document.createElement('li');
    title.classList.add('title');
    title.textContent = `Title: ${suggestedPiece.title}`;
    const difficulty = document.createElement('li');
    difficulty.classList.add('difficulty');
    difficulty.textContent = `Difficulty: ${suggestedPiece.difficulty}`;
    const timePlayed = document.createElement('li');
    timePlayed.classList.add('time-played');
    timePlayed.textContent = `Time to play: ${suggestedPiece.time_to_play}`;
    const reasoning = document.createElement('li');
    reasoning.classList.add('reasoning');
    reasoning.textContent = `Pourquoi: ${suggestedPiece.reason}`;
    const advice = document.createElement('li');
    advice.classList.add('advice');
    advice.textContent = `Conseil: ${suggestedPiece.advice}`;
    return [composer, title, difficulty, timePlayed, reasoning, advice];
}

function appendSuggestionCards(paragraph, suggestions) {
    suggestions.forEach(suggestion => {
        paragraph.appendChild(suggestion);
    });
}

function showSuggestionCards() {
    const contentSuggestion = document.getElementById('content-suggestion');
    contentSuggestion.hidden = false;
}
export function clearPreviousSuggestions() {
    const contentSuggestion = document.getElementById('content-suggestion');
    contentSuggestion.hidden = true;
    while (contentSuggestion.firstChild) {
        contentSuggestion.removeChild(contentSuggestion.firstChild);
    }
}
