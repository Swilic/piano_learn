const cardClass = "card-progression";
export class CardsCreator {
    constructor() {
        this.cardsContainer = document.getElementsByClassName("progression-container")[0];
        this.cardsHeight = 170;
    }
    createCards(progressionData, minHeight) {
        progressionData.completedPieces.map((data) => {
            const card = document.createElement("div");
            card.classList.add(cardClass);
            this.createElementsWithCardValues(card, data);
            this.cardsContainer.appendChild(card);
        });
    }

    createElementsWithCardValues(card, progressionData) {
        const h2Elements = document.createElement("h2");
        h2Elements.textContent = progressionData.composer;
        const h3Elements = document.createElement("h3");
        h3Elements.textContent = progressionData.title;
        const h4Elements = document.createElement("h4");
        h4Elements.textContent = "Time Played: " + progressionData.timePlayed;
        card.appendChild(h2Elements);
        card.appendChild(h3Elements);
        card.appendChild(h4Elements);
    }
}
