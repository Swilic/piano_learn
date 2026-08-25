import { handleRequest as learningRequest } from "./routes/learningRoute.js";
import { handleRequest as progressionRequest } from "./routes/progressionRoute.js";
import { failureResponse } from "./network/networkResponseJsonType.js";
import { corsHeaders } from "./network/corsHeaders.js";

export default {
    async fetch(request, env) {
        if (request.method === "OPTIONS") {
            return new Response(null, {
                status: 204,
                headers: {
                    ...corsHeaders,
                },
            });
        }

        const url = new URL(request.url);

        if (url.pathname === "/" && request.method === "POST") {
            return await learningRequest(request);
        } else if (url.pathname.startsWith("/progression")) {
            return await progressionRequest(request, env);
        }
        return failureResponse("Invalid request path or method.");
    }
};
