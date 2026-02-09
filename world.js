const World = {
  width: 900,
  height: 600,
  time: 0,

  update() {
    this.time++;
  },

  draw(ctx) {
    ctx.fillStyle = "#3a8f3a";
    ctx.fillRect(0, 0, this.width, this.height);
  }
};
