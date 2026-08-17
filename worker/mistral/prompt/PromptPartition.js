import { createPrompt as createSystemPrompt } from "./systemPrompt";
import { createPrompt as createUserPrompt } from "./userPrompt";


export default class PromptPartition {
    constructor(data) {
        this.level = data.level;
        this.completedPieces = data.completedPieces;
        this.userPrompt = createUserPrompt(this.level, this.completedPieces);
        this.systemPrompt = createSystemPrompt();
    }

}
