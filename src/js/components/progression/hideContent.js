export function hideContent() {
    const contentContainer = document.getElementsByClassName('content-container')[0];
    contentContainer.setAttribute('style', 'display: none');
    // contentContainer.inert = true;
}

export function showContent() {
    const contentContainer = document.getElementsByClassName('content-container')[0];
    contentContainer.removeAttribute('style');
}
