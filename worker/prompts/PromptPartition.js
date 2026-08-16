export default class PromptPartition {
    constructor(data) {
        this.level = data.level;
        this.completedPieces = data.completedPieces;
        this.prompt = null;
    }

    creatingPrompt() {
            this.prompt = `
Tu es un professeur de piano.

Voici le niveau actuel de l'élève :

Niveau général : ${this.level}/100

Morceaux déjà terminés :
${this.completedPieces.join(", ")}

Propose 3 morceaux adaptés à son niveau.

Les morceaux doivent être légèrement plus difficiles
que ceux qu'il maîtrise actuellement.

Pour chaque morceau, donne :
- titre
- compositeur
- difficulté sur 10
- raison de la recommandation
- combien de fois il devrait le jouer pour monter d'un niveau
sous cette forme:
{
  "recommandations": [
    {
      "title": "Canon in D",
      "composer": "Pachelbel",
      "difficulty": 5,
      "reason": "...",
      "times_to_play": 10
    },
    {
      "title": "River Flows in You",
      "composer": "Yiruma",
      "difficulty": 5.5,
      "reason": "...",
      "times_to_play": 3
    }
  ]
}
`;
    }
}
