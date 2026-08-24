export class ProgressionQuery {
    constructor(env) {
        this.env = env;
    }

    async fetchProgressionData() {
        const result = await this.env.piano_learn
            .prepare("SELECT * FROM progression WHERE id = 1")
            .all();
        return new Response(JSON.stringify(
            { message: result.results })
            , {
                ok: true,
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
    }

    async modifyProgressionData(request) {
        const requestBody = await request.json();
        const level = requestBody.level;

        const result = await this.env.piano_learn
            .prepare("UPDATE progression SET level = ? WHERE id = 1")
            .bind(level)
            .run();
        if (!result.success) {
            return new Response(JSON.stringify({ error: "Failed to update progression data." }), {
                ok: false,
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }
        return new Response(JSON.stringify({ message: "Progression data modified." }), {
            ok: true,
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    }
}
