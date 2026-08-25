import { PiecesQuery } from "../database/PiecesQuery.js";
import { failureResponse } from "../network/networkResponseJsonType.js";

export async function handleRequest(request, env, path) {
    const subPath = path.slice("/pieces".length);

    if (subPath !== "" && subPath !== "/") {
        return failureResponse("Pieces Route Not Found");
    }
    const piecesQuery = new PiecesQuery(env);
    if (request.method === "GET") {
        return piecesQuery.fetchPiecesData();
    }
    else if (request.method === "POST") {
        return piecesQuery.modifyPiecesData(request);
    }
    else if (request.method === "PUT") {
        const response = await piecesQuery.addNewPiece(request);
        return response;
    }
    return failureResponse("Method not allowed", 405);
}
