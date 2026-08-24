import { ProgressionQuery } from "../database/ProgressionQuery.js";
import { handleRequest as piecesRoute } from "./piecesRoute.js";

export function handleRequest(request, env) {
    const url = new URL(request.url);
    const subPath = url.pathname.slice("/progression".length);

    if (subPath === "/pieces") {
        return piecesRoute(request, env);
    }
    
    if (request.method === "GET" && url.pathname === "/progression") {
        const progressionQuery = new ProgressionQuery(env);
        return progressionQuery.fetchProgressionData();
    }
    else if (request.method === "POST" && url.pathname === "/progression") {
        const progressionQuery = new ProgressionQuery(env);
        return progressionQuery.modifyProgressionData(request);
    }

    return new Response(JSON.stringify({ error: "Progression Route Not Found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
    });

}
