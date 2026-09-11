import {URL} from './url.js';

export async function savePiece(json) {
    try {
        const response = await fetch(URL + 'progression/pieces', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json)
        });

    } catch (error) {
        console.error('Error saving piece:', error);
    }
}
