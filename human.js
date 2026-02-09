class Human {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    // gender
    this.gender = Math.random() > 0.5 ? "male" : "female";

    // identity
    this.name = Human.randomName(this.gender);
    this.skin = Human.pick(["#f2c9a0", "#d9a066", "#8d5524"]);
    this.hair = Human.pick(["#000", "#663300", "#cfa34a"]);
    this.eyes = Human.pick(["#3fa9f5", "#5fd35f", "#6f42c1"]);
    this.shirt = Human.randomColor();
    this.pants = Human.randomColor();

    // body shape
    this.size = Human.rand(0.9, 1.15);
    this.height = this.gender === "male"
      ? Human.rand(18, 22)
      : Human.rand(15, 19);

    this.bodyWidth = this.gender === "male" ? 10 : 8;
    this.shoulder = this.gender === "male" ? 12 : 9;
    this.hairStyle = this.gender === "male" ? "short" : "long";

    // life
    this.energy = 100;
    this.happiness = Human.rand(40, 80);
    this.state = "idle";
    this.dir = Math.random() * Math.PI * 2;
    this.posture = 0; // -1 happy, 0 normal, 1 tired
  }

  update() {
    this.energy -= 0.03;

    if (this.energy > 60) this.happiness += 0.05;
    if (this.energy < 30) this.happiness -= 0.1;

    this.energy = Math.max(0, Math.min(100, this.energy));
    this.happiness = Math.max(0, Math.min(100, this.happiness));

    if (this.energy < 25) this.posture = 1;
    else if (this.happiness > 70) this.posture = -1;
    else this.posture = 0;

    Brain.think(this);
  }

  move() {
    const speed = this.energy < 30 ? 0.2 : 0.4;
    this.x += Math.cos(this.dir) * speed;
    this.y += Math.sin(this.dir) * speed;

    if (this.x < 15 || this.x > World.width - 15) this.dir += Math.PI;
    if (this.y < 25 || this.y > World.height - 25) this.dir += Math.PI;
  }

  draw(ctx) {
    const scale = this.size;
    const bodyH = this.height * scale;
    const headOffset = this.posture === -1 ? -2 : this.posture === 1 ? 2 : 0;

    // shadow
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.beginPath();
    ctx.ellipse(this.x, this.y + bodyH + 10, 8, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // legs
    ctx.strokeStyle = this.pants;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x - 3, this.y + bodyH);
    ctx.lineTo(this.x - 3, this.y + bodyH + 8 * scale);
    ctx.moveTo(this.x + 3, this.y + bodyH);
    ctx.lineTo(this.x + 3, this.y + bodyH + 8 * scale);
    ctx.stroke();

    // body
    ctx.fillStyle = this.shirt;
    if (this.gender === "male") {
      ctx.fillRect(this.x - this.bodyWidth / 2, this.y, this.bodyWidth, bodyH);
    } else {
      ctx.beginPath();
      ctx.moveTo(this.x - this.bodyWidth / 2, this.y);
      ctx.lineTo(this.x + this.bodyWidth / 2, this.y);
      ctx.lineTo(this.x + this.bodyWidth / 2 - 2, this.y + bodyH);
      ctx.lineTo(this.x - this.bodyWidth / 2 + 2, this.y + bodyH);
      ctx.closePath();
      ctx.fill();
    }

    // female chest
    if (this.gender === "female") {
      ctx.fillStyle = this.shirt;
      ctx.beginPath();
      ctx.arc(this.x - 2, this.y + 4, 2.2 * scale, 0, Math.PI * 2);
      ctx.arc(this.x + 2, this.y + 4, 2.2 * scale, 0, Math.PI * 2);
      ctx.fill();
    }

    // arms (emotion)
    const armLift = this.happiness > 70 ? -3 : this.happiness < 30 ? 3 : 0;
    ctx.strokeStyle = this.skin;
    ctx.beginPath();
    ctx.moveTo(this.x - this.shoulder / 2, this.y + 4);
    ctx.lineTo(this.x - this.shoulder, this.y + 8 + armLift);
    ctx.moveTo(this.x + this.shoulder / 2, this.y + 4);
    ctx.lineTo(this.x + this.shoulder, this.y + 8 + armLift);
    ctx.stroke();

    // head
    ctx.fillStyle = this.skin;
    ctx.beginPath();
    ctx.arc(this.x, this.y - 6 + headOffset, 6 * scale, 0, Math.PI * 2);
    ctx.fill();

    // hair
    ctx.fillStyle = this.hair;
    if (this.hairStyle === "short") {
      ctx.beginPath();
      ctx.arc(this.x, this.y - 9 + headOffset, 6 * scale, Math.PI, 0);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y - 8 + headOffset, 6 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(this.x - 6 * scale, this.y - 2 + headOffset, 12 * scale, 10 * scale);
    }

    // eyes
    ctx.fillStyle = this.eyes;
    ctx.fillRect(this.x - 3 * scale, this.y - 7 + headOffset, 2 * scale, 2 * scale);
    ctx.fillRect(this.x + 1 * scale, this.y - 7 + headOffset, 2 * scale, 2 * scale);

    // name
    ctx.fillStyle = "#fff";
    ctx.font = "10px monospace";
    ctx.textAlign = "center";
    ctx.fillText(this.name, this.x, this.y - 20);
  }

  static randomName(gender) {
    const male = ["Kai", "Noah", "Sora", "Niko", "Ari"];
    const female = ["Elin", "Luna", "Mila", "Ava", "Yuki"];
    const list = gender === "male" ? male : female;
    return list[Math.floor(Math.random() * list.length)];
  }

  static pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  static rand(min, max) {
    return min + Math.random() * (max - min);
  }

  static randomColor() {
    return `hsl(${Math.random() * 360},60%,60%)`;
  }
}
