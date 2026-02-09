const World = {
  width: 800,
  height: 500,
  time: 0,
  day: 1,

  update() {
    this.time++;
    if (this.time % 600 === 0) {
      this.day++;
      log(`🌞 Day ${this.day} begins`);
    }
  },

  draw(ctx) {
    ctx.fillStyle = "#2c5f2d"; // ground
    ctx.fillRect(0, 0, this.width, this.height);
  }
};
