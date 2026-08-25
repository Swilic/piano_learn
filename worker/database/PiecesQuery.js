import { successResponse, failureResponse } from "../network/networkResponseJsonType.js";

export class PiecesQuery {
    constructor(env) {
        this.env = env;
    }

    async fetchPiecesData() {
        const result = await this.env.piano_learn
            .prepare("SELECT * FROM completed_pieces")
            .all();
        if (!result.success) {
            return failureResponse("Failed to fetch pieces data.");
        }
        return successResponse(result.results);
    }

    async modifyPiecesData(request) {
        const requestBody = await request.json();
        const checkResult = await this.checkBeforeUpdate(requestBody);
        if (checkResult.ok === false) {
            return failureResponse("Piece does not exist.");
        }
        const result = await this.env.piano_learn
            .prepare("UPDATE completed_pieces SET time_played = ? WHERE composer = ? AND title = ?")
            .bind(requestBody.time_played, requestBody.composer, requestBody.title)
            .run();
        if (!result.success) {
            return failureResponse("Failed to update pieces data.");
        }
        return successResponse("Pieces data modified.");
    }

    async addNewPiece(request) {
        const requestBody = await request.json();
        const checkResult = await this.checkBeforeInsert(requestBody);
        if (checkResult.ok === false) {
            return failureResponse("Piece already exists.");
        }
        const result = await this.env.piano_learn
            .prepare("INSERT INTO completed_pieces (composer, title, time_played, time_to_play) VALUES (?, ?, ?, ?)")
            .bind(requestBody.composer, requestBody.title, requestBody.time_played, requestBody.time_to_play)
            .run();
        if (!result.success) {
            return failureResponse("Failed to add new piece.");
        }
        return successResponse("New piece added.");
    }

    async checkDataExistence(requestBody) {
        const result = await this.env.piano_learn
            .prepare("SELECT * FROM completed_pieces WHERE composer = ? AND title = ?")
            .bind(requestBody.composer, requestBody.title)
            .all();
        if (!result.success) {
            return failureResponse("failed to check for existing piece.");
        }
        return result;
    }

    async checkBeforeInsert(requestBody) {
        const result = await this.checkDataExistence(requestBody);
        if (result.ok === false || result.results.length > 0) {
            return failureResponse("Piece already exists.");
        }
        return successResponse("Piece does not exist.");
    }
    async checkBeforeUpdate(requestBody) {
        const result = await this.checkDataExistence(requestBody);
        if (result.ok === false || result.results.length === 0) {
            return failureResponse("Piece does not exist.");
        }
        return successResponse("Piece exists.");
    }
}
