function generateRecommendation(level, completedPieces) {
    fetch("http://localhost:8787", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
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
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response.json();
        })
        .then(data => {
            console.log(data.recommandation);
        })
        .catch(error => {
            console.error(error);
        });
}
