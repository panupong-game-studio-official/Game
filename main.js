const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const humans = [
  new Human(300,300),
  new Human(600,350)
];

function loop() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  World.update();
  World.draw(ctx);

  humans.forEach(h=>{
    h.update();
    h.draw(ctx);
  });

  requestAnimationFrame(loop);
}

loop();
