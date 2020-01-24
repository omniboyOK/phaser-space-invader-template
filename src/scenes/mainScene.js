import Phaser from "phaser";
import Player from "../entities/player";
import RedShip from "../entities/redShip";
import player_sprite from "../assets/PNG/playerShip1_blue.png";
import background_sprite from "../assets/backgrounds/purple.png";
import shoot_sprite from "../assets/PNG/lasers/laserBlue01.png";
import red_ship_sprite from "../assets/PNG/Enemies/enemyRed1.png";

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "mainScene" });
  }

  preload() {
    // here we preload the graphics, this can be modulated later
    this.load.image("sprPlayer", player_sprite);
    this.load.image("sprBackground", background_sprite);
    this.load.image("sprShoot", shoot_sprite);
    this.load.image("sprRedShip", red_ship_sprite);
  }

  create() {
    //We create containers that will group multiple objects
    this.enemies = this.add.group();
    this.playerLasers = this.add.group();

    this.background = this.add.tileSprite(
      240,
      320,
      this.game.config.width,
      this.game.config.height,
      "sprBackground"
    );
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprPlayer"
    );

    // This is the enemy creation, we will modulate it in the troops later
    this.time.addEvent({
      delay: 1000, // this can be changed to a higher value like 5000
      callback: function() {
        // it will spawn at Y: 0 (top), and a random X value based on screen width
        var enemy = new RedShip(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          0
        );
        this.enemies.add(enemy);
        enemy.move();
      },
      callbackScope: this,
      loop: true
    });

    //Setting collisions
    this.physics.add.overlap(this.enemies, this.player, (enemy, player) => {
      player.onDestroy();
    });

    this.physics.add.overlap(this.enemies, this.playerLasers, (enemy, laser) => {
      enemy.destroy();
      laser.destroy();
    });
  }

  update() {
    this.background.tilePositionY -= 3;
    this.player.update();
    //Removing objects out of the screen
    //Removing objects out of the screen
    this.playerLasers.getChildren().forEach(element => {
      element.checkOutOfBonds()
    });
    this.enemies.getChildren().forEach(element => {
      element.checkOutOfBonds()
    });
  }
}

export default MainScene;
