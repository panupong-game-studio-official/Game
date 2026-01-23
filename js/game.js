import { createPlayer } from './player.js';
import { createWorld } from './world.js';

export function initGame() {
  console.log("Game Started");

  createWorld();
  createPlayer();
}
