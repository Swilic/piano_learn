const cardClass = "card-progression";
const emptyCardClass = "empty-card-progression";
export class CardsCreator {
    constructor() {
        this.cardsContainer = document.getElementsByClassName("progression-container")[0];
        this.cardsHeight = 210;
        this.cardsPerRow = 3;
    }
    createCards(progressionData, windowHeight) {
        progressionData.completedPieces.map((data) => {
            const card = document.createElement("div");
            card.classList.add(cardClass);
            this.createElementsWithCardValues(card, data);
            this.cardsContainer.appendChild(card);
        });
        this.fillCardsContainerWithEmptyCards(windowHeight);
    }

    createElementsWithCardValues(card, progressionData) {
        const h2Elements = document.createElement("h2");
        h2Elements.classList.add("composer");
        h2Elements.textContent = progressionData.composer;
        const h3Elements = document.createElement("h3");
        h3Elements.classList.add("title");
        h3Elements.textContent = progressionData.title;
        const h4Elements = document.createElement("h4");
        h4Elements.classList.add("time-played");
        h4Elements.textContent = "Time Played: " + progressionData.time_played;
        const timeToPlayElements = document.createElement("h4");
        timeToPlayElements.classList.add("time-to-play");
        timeToPlayElements.textContent = "Time to Play: " + progressionData.time_to_play;
        timeToPlayElements.hidden = true; 
        card.appendChild(h2Elements);
        card.appendChild(h3Elements);
        card.appendChild(h4Elements);
        card.appendChild(timeToPlayElements);
    }

    fillCardsContainerWithEmptyCards(windowHeight) {
        const totalEmptyCardsNeeded = this.computeEmptyCardsNeeded(windowHeight);
        for (let i = 0; i < totalEmptyCardsNeeded ; i++) {
            const emptyCard = document.createElement("div");
            emptyCard.classList.add(cardClass, emptyCardClass); 
            this.cardsContainer.appendChild(emptyCard);
        }
    }
    computeEmptyCardsNeeded(windowHeight) {
        const spaceAvailable = windowHeight - this.cardsContainer.getBoundingClientRect().top;
        const existingCardsCount = this.cardsContainer.getElementsByClassName(cardClass).length;
        const missingCardsCount = (this.cardsPerRow - (existingCardsCount % this.cardsPerRow)) % this.cardsPerRow;
        let rowsNeeded = Math.ceil(spaceAvailable / (this.cardsHeight)); 
        rowsNeeded -= Math.ceil(existingCardsCount / this.cardsPerRow);
        return rowsNeeded * this.cardsPerRow + missingCardsCount;
    }
}
