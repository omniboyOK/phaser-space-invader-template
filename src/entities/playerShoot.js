import Entity from "./entity";

class playerShoot extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprShoot", "Shoot");
    this.setData("speed", 500);
  }

  move() {
    this.body.velocity.y = -this.getData("speed");
  }
}

export default playerShoot;