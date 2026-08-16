import Network from "./network/Network.js";
import { corsHeaders } from "./network/corsHeaders.js";
export default {
    async fetch(request, env) {

        const network = new Network(request);
        const networkResponse = network.checkHeaders();
        if (networkResponse !== null) {
            return networkResponse;
        }

        const dataValidityResponse = await network.checkDataValidity();
        if (dataValidityResponse !== null) {
            return dataValidityResponse;
        }

        // return new Response(
        //     JSON.stringify({
        //         message: "Données reçues avec succès",
        //         data: network.data
        //     }),
        //     {
        //         headers: {
        //             ...corsHeaders,
        //             "Content-Type": "application/json"
        //         }
        //     }
        // );

        const prompt = "Est-ce que tu gardes une trace de notre conversation ?";


        // Création du prompt

        const mistralResponse = await fetch(
            "https://api.mistral.ai/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Authorization": `Bearer ${env.MISTRAL_API_KEY}`,
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    model: "mistral-small-latest",

                    messages: [
                        {
                            role: "system",
                            content:
                                "Tu es un professeur de piano spécialisé dans la progression des pianistes débutants et intermédiaires."
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ]
                })
            }
        );


        if (!mistralResponse.ok) {

            const errorText = await mistralResponse.text();

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

        const mistralData = await mistralResponse.json();

        const answer =
            mistralData.choices[0].message.content;

        // Réponse envoyée à ton site
        return new Response(
            JSON.stringify({
                recommendation: answer
            }),
            {
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json"
                }
            }
        );
    }
};
