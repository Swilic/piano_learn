import { URL } from './url.js';

export async function updatePiece(json) {
    try {
        const response = await fetch(URL + 'progression/pieces', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error updating piece:', error);
    }
}
