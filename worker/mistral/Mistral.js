import PromptPartition from "./prompt/PromptPartition";
import { corsHeaders } from "../network/corsHeaders.js";

const role = {
    system: "system",
    user: "user"
}

const model = {
    medium: "mistral-small-latest"
}

export default class Mistral {
    constructor(data) {
        this.prompt = new PromptPartition(data);
        this.apiUrl = "https://api.mistral.ai/v1/chat/completions";
        this.method = "POST";
        this.headers = {
            "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
            "Content-Type": "application/json"
        };
        this.body = this.createRequestBody();

    }
    createRequestBody() {
        return {
            model: model.medium,
            messages: [
                {
                    role: role.system,
                    content: this.prompt.systemPrompt
                },
                {
                    role: role.user,
                    content: this.prompt.userPrompt
                }
            ]
        };
    }

    async handleErrorResponse(mistral) {
        const errorText = await mistral.text()

        console.error(
            "Mistral error:",
            mistralResponse.status,
            errorText
        );

        return new Response(
            JSON.stringify({
                error: "Erreur Mistral",
                status: mistralResponse.status,
                details: errorText
            }),
            {
                status: mistralResponse.status,
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json"
                }
            }
        );
    }

    async handleValidResponse(mistral) {
        const mistralData = await mistral.json();

        const answer =
            mistralData.choices[0].message.content;

        return new Response(
            JSON.stringify({
                recommandation: answer
            }),
            {
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json"
                }
            }
        );
    }
} 
