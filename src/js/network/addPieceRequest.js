export async function savePiece(json) {
    try {
        const response = await fetch('http://localhost:8787/progression/pieces', {
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
