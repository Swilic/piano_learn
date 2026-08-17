import PromptPartition from "./prompt/PromptPartition";

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
    // TODO: well
    handleErrorResponse() {

    }
    // TODO: well
    handleValidResponse() {

    }
} 
