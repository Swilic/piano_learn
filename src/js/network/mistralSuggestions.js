
export async function askMistralForSuggestions() {
    const response = await fetch('http://localhost:8787/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            level: 1,
            completed_pieces: [{
                composer: "Beethoven",
                title: "Symphony No. 5",
                time_played: 5
            }
            ]
        })
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.recommandation;

}
