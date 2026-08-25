import { clearPreviousSuggestions } from "./suggestionsButtonCallback.js";

export function handleSuggestionEvent(event) {
    clearPreviousSuggestions();
    createActiveCard(event.currentTarget);
    // Call the function to send request to the database
}

function createActiveCard(selectedCard) {
    const activeCard = createElementsActiveCard(selectedCard);
    activeCard.appendChild(createSearchPartitionLink(selectedCard));
    document.getElementsByClassName('content-active-card')[0].appendChild(document.createElement('h2')).textContent = "Active Card";
    document.getElementsByClassName('content-active-card')[0].appendChild(activeCard);
}

function createElementsActiveCard(selectedCard) {
    const activeCard = document.createElement('div');
    activeCard.classList.add('active-card');
    const composer = document.createElement('H2');
    composer.classList.add('composer');
    composer.textContent = selectedCard.querySelector('.composer').textContent.slice("Composer: ".length);
    const title = document.createElement('H3');
    title.classList.add('title');
    title.textContent = selectedCard.querySelector('.title').textContent.slice("Title: ".length);
    activeCard.appendChild(composer);
    activeCard.appendChild(title);
    return activeCard;
}
function createSearchPartitionLink(selectedCard) {
    const searchPartitionLink = document.createElement('a');
    searchPartitionLink.classList.add('search-partition-link');
    const composer = selectedCard.querySelector('.composer').textContent.slice("Composer: ".length);
    const title = selectedCard.querySelector('.title').textContent.slice("Title: ".length);
    const query = `${composer} ${title}`;
    searchPartitionLink.href = `https://www.google.com/search?q=site:imslp.org+${encodeURIComponent(query)}`;
    searchPartitionLink.target = '_blank';
    searchPartitionLink.textContent = 'Search for Partition';
    return searchPartitionLink;
}

export function clearActiveCard() {
    const contentActiveCard = document.getElementsByClassName('content-active-card')[0];
    while (contentActiveCard.firstChild) {
        contentActiveCard.removeChild(contentActiveCard.firstChild);
    }
}
