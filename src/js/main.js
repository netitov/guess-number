import '../assets/styles/index.css';
import Level from './level';
import Game from './game';
import { renderConfetti } from './confetti';


const gameLevel = new Level(updateLevel, updateRandomNumber);
const game = new Game(renderConfetti);

gameLevel.setEventListeners();
game.setEventListeners();

function updateLevel(value) {
  game.updateInterval(value);
}

function updateRandomNumber(value) {
  game.updateRandomNumber(value);
  game.clearResultBox();
}

//renderConfetti();



