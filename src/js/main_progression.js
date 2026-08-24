import { CardsCreator } from "./builders/CardsCreator.js";
import { loadProgression } from "./repositories/progressionData.js";

const cc = new CardsCreator();
cc.createCards(await loadProgression(), window.innerHeight);
