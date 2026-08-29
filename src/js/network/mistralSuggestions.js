
export async function askMistralForSuggestions(json) {

    const response = await fetch('https://pianolearn.diamankazberuk.workers.dev/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ level: json.level, completed_pieces: json.completedPieces })
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.recommandation;

}
