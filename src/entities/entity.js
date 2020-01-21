/*
An entity is our base concept for an object that will be represented on screen.
This is object can be used through inheritance (extend) to create players, enemies,
obstacles or even interactive menu elements.
*/
import Phaser from "phaser";

class Entity extends Phaser.GameObjects.Sprite {
  // x and y are the position where the object will be spawned
  constructor(scene, x, y, texture, type) {
    super(scene, x, y, texture);
    this.setTexture(texture)
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("type", type);
    this.setData("isDead", false);
  }

  onDestroy(){
    this.setData('isDead', true);
    this.visible = false;
  }
}

export default Entity;