import { successResponse, failureResponse } from "../network/networkResponseJsonType";
export class ProgressionQuery {
    constructor(env) {
        this.env = env;
    }

    async fetchProgressionData() {
        const result = await this.env.piano_learn
            .prepare("SELECT * FROM progression WHERE id = 1")
            .all();
        if (!result.success) {
            return failureResponse("Failed to fetch progression data.", 500);
        }
        return successResponse(result.results);
    }

    async modifyProgressionData(request) {
        const requestBody = await request.json();

        const result = await this.env.piano_learn
            .prepare("UPDATE progression SET level = ?, experience = ? WHERE id = 1")
            .bind(requestBody.level, requestBody.experience)
            .run();
        if (!result.success) {
            return failureResponse("Failed to update progression data.", 500);
        }
        return successResponse("Progression data modified.");
    }
}
