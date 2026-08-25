import { corsHeaders } from "../network/corsHeaders.js";
import { successResponse, failureResponse } from "../network/networkResponseJsonType.js";
import ParserRequest from "../parser/ParserRequest.js";

export default class Network {
    constructor(request) {
        this.request = request;
        this.data = null;
    }
    checkHeaders() {
        if (this.request.method === "OPTIONS") {
            return new Response(null, {
                status: 204,
                headers: {
                    ...corsHeaders,
                },
            });
        }

        if (this.request.method !== "POST") {
            return failureResponse("Method not allowed", 405);
        }
        return null;
    }

    /**
    * @description Parse the request and validate the data
    * throws an error if the data is invalid
    */

    async parseRequest() {
        const parser = new ParserRequest(this.request);
        this.data = await parser.parseJson();
        parser.keyDataValidation(this.data);
    }

    async checkDataValidity() {
        try {
            await this.parseRequest();
        } catch (error) {
            return failureResponse("Erreur serveur", 500);
        }
        return null;
    }
    async fetchMistral(mistral) {
        return await fetch(
            mistral.apiUrl,
            {
                method: mistral.method,
                headers: mistral.headers,
                body: JSON.stringify(mistral.body)
            }
        );
    }
}
