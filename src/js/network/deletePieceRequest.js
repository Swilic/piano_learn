export async function deletePieceRequest(completed_piece) {
    try {
        const response = await fetch('https://pianolearn.diamankazberuk.workers.dev/progression/pieces', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(completed_piece)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error deleting piece:', error);
    }
}
