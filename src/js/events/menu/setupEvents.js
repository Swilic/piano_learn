import { handleMenuButtonEvent } from "./menuButtonsCallback.js";

export function setupEvents() {
    const buttons = document.getElementsByClassName('button-choice');
    console.log('Buttons found:', buttons);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', handleMenuButtonEvent);
    }
}
