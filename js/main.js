import { showMenu } from './menu.js';
import { initGame } from './game.js';

showMenu();

window.startGame = () => {
  document.getElementById("menu").style.display = "none";
  initGame();
};
