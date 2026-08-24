import { ProgressionQuery } from "../database/ProgressionQuery.js";
import { failureResponse } from "../network/networkResponseJsonType.js";
import { handleRequest as piecesRoute } from "./piecesRoute.js";

export function handleRequest(request, env) {
    const url = new URL(request.url);
    const subPath = url.pathname.slice("/progression".length);

    if (subPath.startsWith("/pieces")) {
        return piecesRoute(request, env, subPath);
    }
    
    if (subPath !== "" && subPath !== "/") {
        return failureResponse("Progression Route Not Found", 404);
    }
    const progressionQuery = new ProgressionQuery(env);
    if (request.method === "GET" ) {
        return progressionQuery.fetchProgressionData();
    }
    else if (request.method === "POST") {
        return progressionQuery.modifyProgressionData(request);
    }
}
