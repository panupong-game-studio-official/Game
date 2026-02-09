const Brain = {
  think(h) {
    if (h.energy < 20) {
      h.state = "rest";
      h.energy += 0.1;
      return;
    }

    h.state = "walk";
    if (Math.random() < 0.01) {
      h.dir = Math.random() * Math.PI * 2;
    }
    h.move();
  }
};
