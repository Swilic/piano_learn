import Mistral from "./mistral/Mistral.js";
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

        const mistral = new Mistral(network.data);

        const mistralResponse = await network.fetchMistral(mistral);



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
};
