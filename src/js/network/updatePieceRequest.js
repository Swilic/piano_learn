export async function updatePiece(json) {
    try {
        const response = await fetch('http://localhost:8787/progression/pieces', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Piece updated successfully:', data);
    } catch (error) {
        console.error('Error updating piece:', error);
    }
}
