import { handleRequest as learningRequest } from "./routes/learningRoute.js";
import { handleRequest as progressionRequest } from "./routes/progressionRoute.js";

export default {
    async fetch(request, env) {
        const url = new URL(request.url);


        if (url.pathname === "/" && request.method === "POST") {
            return await learningRequest(request);
        } else if (url.pathname.startsWith("/progression")) {
            return await progressionRequest(request, env);
        }
        return new Response(JSON.stringify({ error: "Not Found" }), {
            body: JSON.stringify({ error: "Not Found" }),
            status: 404
        });
    }
};
