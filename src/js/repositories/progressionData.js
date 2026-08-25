export async function loadProgression() {
    const levelData = await getLevelData();
    const level = levelData[0].level;
    const completedPiecesData = await getCompletedPieces();
    return {
        level: level,
        completedPieces: completedPiecesData
    };
}

export function checkIfPieceAlreadyCompleted(pieceId, completedPieces) {
    for (const completedPiece of completedPieces) {
        if (completedPiece.composer === pieceId.composer && completedPiece.title === pieceId.title) {
            return { already_played: true, timePlayed: completedPiece.time_played };
        }
    }
    return { already_played: false, timePlayed: 0 };
}

export async function getLevelData() {
    const response = await fetch("http://localhost:8787/progression", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${data.error}`);
    }
    return data.message;
}

async function getCompletedPieces() {
    const response = await fetch("http://localhost:8787/progression/pieces", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${data.error}`);
    }
    return data.message;
}
