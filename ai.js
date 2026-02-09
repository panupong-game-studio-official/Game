const AI = {
  think(npc) {
    if (npc.hunger > 80) {
      npc.state = "hungry";
      log(`${npc.name} feels hungry`);
    }

    if (npc.energy < 30) {
      npc.state = "rest";
      npc.energy += 0.2;
      return;
    }

    if (npc.state === "hungry") {
      npc.energy += 0.05;
      npc.hunger -= 0.1;
      return;
    }

    // walk randomly
    npc.state = "walk";
    npc.move(Math.random() * 2 - 1, Math.random() * 2 - 1);
  }
};
