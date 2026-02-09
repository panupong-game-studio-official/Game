class NPC {
  constructor(name, gender, x, y) {
    this.name = name;
    this.gender = gender;
    this.x = x;
    this.y = y;

    this.energy = 100;
    this.hunger = 0;
    this.state = "idle";
  }

  update() {
    this.hunger += 0.02;
    this.energy -= 0.01;

    AI.think(this);
  }

  draw(ctx) {
    ctx.fillStyle = this.gender === "male" ? "cyan" : "pink";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
}
