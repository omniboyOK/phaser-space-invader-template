import Entity from "./entity";
import Shoot from "./playerShoot";

class Player extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "sprPlayer", "Player");
    this.setData("speed", 300);

    // This are the move keys for our player
    this.scene.keyW = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );
    this.scene.keyS = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.scene.keyA = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A
    );
    this.scene.keyD = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );
    this.scene.keySpace = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  moveUp() {
    this.body.velocity.y = -this.getData("speed");
  }
  moveDown() {
    this.body.velocity.y = this.getData("speed");
  }
  moveLeft() {
    this.body.velocity.x = -this.getData("speed");
  }
  moveRight() {
    this.body.velocity.x = this.getData("speed");
  }

  // Our ship creates a laser
  shoot() {
    // If our ship isn't charging then it shoots
    if (!this.getData("isCharging")) {
      let shoot = new Shoot(
        this.scene,
        this.body.position.x + 50,
        this.body.position.y
      );
      this.scene.playerLasers.add(shoot);
      // We call the update function so our laser moves
      shoot.update();
      //We set our shooting to charging
      this.coolDown();
    }
  }
  // This prevent creating an infinite amount of lasers
  coolDown() {
    this.setData("isCharging", true);
    setTimeout(() => {
      this.setData("isCharging", false);
    }, 500);
  }

  // On the update cycle, the body of the sprite will be rendered on new position
  update() {
    //We check if player is not dead
    if (!this.getData("isDead")) {

      this.body.setVelocity(0, 0);
      this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
      this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

      if (this.scene.keyW.isDown) {
        this.moveUp();
      } else if (this.scene.keyS.isDown) {
        this.moveDown();
      }
      if (this.scene.keyA.isDown) {
        this.moveLeft();
      } else if (this.scene.keyD.isDown) {
        this.moveRight();
      }
      if (this.scene.keySpace.isDown) {
        this.shoot();
      }
    }
  }
}

export default Player;
