export function createNewPieceInput() {
    const newPieceInputContainer = document.createElement('div');
    newPieceInputContainer.classList.add('new-piece-input-container');
    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');
    newPieceInputContainer.appendChild(inputContainer);

    const composerInput = document.createElement('input');
    composerInput.type = 'text';
    composerInput.placeholder = 'Composer';
    composerInput.classList.add('composer-input');

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Title';
    titleInput.classList.add('title-input');

    const timePlayedInput = document.createElement('input');
    timePlayedInput.type = 'number';
    timePlayedInput.textContent = '0';
    timePlayedInput.placeholder = 'Time Played';
    timePlayedInput.classList.add('time-played-input');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    newPieceInputContainer.appendChild(buttonContainer);

    const validateButton = document.createElement('button');
    validateButton.textContent = 'Validate';
    validateButton.classList.add('validate-button');

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add('cancel-button');

    inputContainer.appendChild(composerInput);
    inputContainer.appendChild(titleInput);
    inputContainer.appendChild(timePlayedInput);
    buttonContainer.appendChild(validateButton);
    buttonContainer.appendChild(cancelButton);

    return newPieceInputContainer;
}
