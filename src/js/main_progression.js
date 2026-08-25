import { CardsCreator } from "./builders/CardsCreator.js";
import { setupEvents } from "./events/progression/setupEvents.js";
import { loadProgression } from "./repositories/progressionData.js";

const cc = new CardsCreator();
cc.createCards(await loadProgression(), window.innerHeight);

setupEvents();
