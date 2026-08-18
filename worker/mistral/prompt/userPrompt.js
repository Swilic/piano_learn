export function createPrompt(level, completedPieces){
    return `
Tu es un professeur de piano.

Voici le niveau actuel de l'élève :

Niveau général : ${level}

Morceaux déjà terminés :
${completedPieces.join(", ")}

Propose 3 morceaux adaptés à son niveau.

Les morceaux doivent être légèrement plus difficiles
que ceux qu'il maîtrise actuellement.

Pour chaque morceau, donne :
- titre
- compositeur
- difficulté sur 10
- raison de la recommandation
- conseil supplémentaire pour l'apprentissage
- combien de fois il devrait le jouer pour monter d'un niveau
sous cette forme:
{
  "recommandations": [
    {
      "title": "Canon in D",
      "composer": "Pachelbel",
      "difficulty": 5,
      "reason": "...",
      "conseil": "...",
      "times_to_play": 10
    },
    {
      "title": "River Flows in You",
      "composer": "Yiruma",
      "difficulty": 5.5,
      "reason": "...",
      "conseil": "...",
      "times_to_play": 3
    }
  ]
}
Tu dois me répondre en JSON, sans texte supplémentaire, et uniquement le JSON.
`;

}
