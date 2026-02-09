class Human {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    // DNA
    this.name = Human.randomName();
    this.gender = Math.random() > 0.5 ? "male" : "female";
    this.skin = Human.pick(["#f2c9a0","#d9a066","#8d5524"]);
    this.hair = Human.pick(["#000","#663300","#cfa34a"]);
    this.eyes = Human.pick(["#3fa9f5","#5fd35f","#6f42c1"]);
    this.shirt = Human.randomColor();
    this.pants = Human.randomColor();

    // body
    this.energy = 100;
    this.state = "idle";
    this.dir = Math.random() * Math.PI * 2;
  }

  update() {
    this.energy -= 0.03;
    Brain.think(this);
  }

  draw(ctx) {
    // shadow
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.beginPath();
    ctx.ellipse(this.x, this.y + 12, 8, 4, 0, 0, Math.PI*2);
    ctx.fill();

    // legs
    ctx.strokeStyle = this.pants;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x - 3, this.y + 10);
    ctx.lineTo(this.x - 3, this.y + 18);
    ctx.moveTo(this.x + 3, this.y + 10);
    ctx.lineTo(this.x + 3, this.y + 18);
    ctx.stroke();

    // body
    ctx.fillStyle = this.shirt;
    ctx.fillRect(this.x - 5, this.y, 10, 10);

    // arms
    ctx.strokeStyle = this.skin;
    ctx.beginPath();
    ctx.moveTo(this.x - 5, this.y + 3);
    ctx.lineTo(this.x - 10, this.y + 6);
    ctx.moveTo(this.x + 5, this.y + 3);
    ctx.lineTo(this.x + 10, this.y + 6);
    ctx.stroke();

    // head
    ctx.fillStyle = this.skin;
    ctx.beginPath();
    ctx.arc(this.x, this.y - 6, 6, 0, Math.PI*2);
    ctx.fill();

    // hair
    ctx.fillStyle = this.hair;
    ctx.beginPath();
    ctx.arc(this.x, this.y - 9, 6, Math.PI, 0);
    ctx.fill();

    // eyes
    ctx.fillStyle = this.eyes;
    ctx.fillRect(this.x - 3, this.y - 7, 2, 2);
    ctx.fillRect(this.x + 1, this.y - 7, 2, 2);

    // name
    ctx.fillStyle = "#fff";
    ctx.font = "10px monospace";
    ctx.textAlign = "center";
    ctx.fillText(this.name, this.x, this.y - 18);
  }

  move() {
    this.x += Math.cos(this.dir) * 0.4;
    this.y += Math.sin(this.dir) * 0.4;

    if (this.x < 10 || this.x > World.width-10) this.dir += Math.PI;
    if (this.y < 20 || this.y > World.height-20) this.dir += Math.PI;
  }

  static randomName() {
    const names = ["Ari","Luna","Noah","Mila","Kai","Elin","Sora","Niko"];
    return names[Math.floor(Math.random()*names.length)];
  }
  static pick(arr){ return arr[Math.floor(Math.random()*arr.length)] }
  static randomColor(){
    return `hsl(${Math.random()*360},60%,60%)`;
  }
}
