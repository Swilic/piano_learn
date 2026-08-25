export function handleSuggestionEvent(event) {
    const selectedCard = event.currentTarget;
    if (selectedCard.classList.contains('empty-card-progression')) {
        return;
    }
    const completed_piece = createCompletedPieceObject(selectedCard);
    sessionStorage.setItem('activePiece', JSON.stringify(completed_piece));
    sessionStorage.setItem('activeProgressionCard', 'true');
    window.location.href = "learning.html";
}

function createCompletedPieceObject(selectedCard) {
    const composer = selectedCard.querySelector('.composer').textContent;
    const title = selectedCard.querySelector('.title').textContent;
    const timePlayed = selectedCard.querySelector('.time-played').textContent.slice("Time Played: ".length);
    const timeToPlay = selectedCard.querySelector('.time-to-play').textContent.slice("Time to Play: ".length);
    return {
        composer: composer,
        title: title,
        timePlayed: parseInt(timePlayed),
        timeToPlay: parseInt(timeToPlay)
    };
}
