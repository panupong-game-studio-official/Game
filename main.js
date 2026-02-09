const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const logBox = document.getElementById("log");

function log(text) {
  logBox.innerHTML += text + "<br>";
  logBox.scrollTop = logBox.scrollHeight;
}

const npcs = [
  new NPC("Adam", "male", 200, 250),
  new NPC("Eva", "female", 600, 250)
];

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  World.update();
  World.draw(ctx);

  npcs.forEach(npc => {
    npc.update();
    npc.draw(ctx);
  });

  requestAnimationFrame(gameLoop);
}

log("🌍 World created");
gameLoop();
