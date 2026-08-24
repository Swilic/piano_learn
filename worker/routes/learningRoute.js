import Mistral from "../mistral/Mistral.js";
import Network from "../network/Network.js";


export async function handleRequest(request) {
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
        return mistral.handleErrorResponse(mistralResponse);
    }
    return mistral.handleValidResponse(mistralResponse);
}
