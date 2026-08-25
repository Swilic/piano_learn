export function createActiveCard() {
    const completedPieces =  JSON.parse(sessionStorage.getItem("activePiece")) || [];
    const activeCard = createLearningCard(completedPieces);
    activeCard.appendChild(createSearchPartitionLink(completedPieces));
    document.getElementsByClassName('content-active-card')[0].appendChild(document.createElement('h2')).textContent = 'Active Card';
    document.getElementsByClassName('content-active-card')[0].appendChild(createActiveCardContainer(activeCard));
}

function createActiveCardContainer(activeCard) {
    const substractDiv = document.createElement('div');
    substractDiv.classList.add('math', 'substract');
    substractDiv.textContent = 'Substract';
    const addDiv = document.createElement('div');
    addDiv.classList.add('math', 'add');
    addDiv.textContent = 'Add';
    const activeCardContainer = document.createElement('div');
    activeCardContainer.classList.add('active-card-container');
    activeCardContainer.appendChild(substractDiv);
    activeCardContainer.appendChild(activeCard);
    activeCardContainer.appendChild(addDiv);
    return activeCardContainer;
}

function createLearningCard(completedPieces) {
    const activeCard = document.createElement('div');
    activeCard.classList.add('active-card');
    const composer = document.createElement('H2');
    composer.classList.add('composer');
    composer.textContent = completedPieces.composer;
    const title = document.createElement('H3');
    title.classList.add('title');
    title.textContent = completedPieces.title;
    const timePlayed = document.createElement('p');
    timePlayed.classList.add('time-played');
    timePlayed.textContent = `Time played: ${completedPieces.timePlayed}`;
    activeCard.appendChild(composer);
    activeCard.appendChild(title);
    activeCard.appendChild(timePlayed);
    return activeCard;
}

function createSearchPartitionLink(completedPieces) {
    const searchPartitionLink = document.createElement('a');
    searchPartitionLink.classList.add('search-partition-link');
    const composer = completedPieces.composer;
    const title = completedPieces.title;
    const query = `${composer} ${title}`;
    searchPartitionLink.href = `https://www.google.com/search?q=site:imslp.org+${encodeURIComponent(query)}`;
    searchPartitionLink.target = '_blank';
    searchPartitionLink.textContent = 'Search for Partition';
    return searchPartitionLink;
}
