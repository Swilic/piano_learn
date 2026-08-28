export async function updateProgression(json) {
    try {
        const response = await fetch('https://pianolearn.diamankazberuk.workers.dev/progression', {
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
        console.error('Error updating progression:', error);
    }
}
