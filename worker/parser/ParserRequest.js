export default class ParserRequest {
    constructor(request) {
        this.request = request;
    }

    async parseJson() {
        try {
            const data = await this.request.json();
            return data;
        } catch (error) {
            throw new Error("Invalid JSON");
        }
    }

    keyDataValidation(data) {
        const requiredKeys = ['level', 'completedPieces'];
        const missingKeys = requiredKeys.filter(key => !(key in data));

        if (missingKeys.length > 0) {
            throw new Error(`Missing required keys: ${missingKeys.join(', ')}`);
        }
        if (typeof data.level !== 'number' || !Array.isArray(data.completedPieces)) {
            throw new Error("Invalid data types for keys");
        }
    }
}
