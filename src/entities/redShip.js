import Entity from "./entity";

class RedShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprRedShip", "RedShip");
    this.setData("speed", 300);
  }

  update() {
    if (!this.getData("isDead")) {
      this.body.velocity.y = this.getData("speed");
    }
  }
}

export default RedShip;
