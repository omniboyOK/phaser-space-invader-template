import Phaser from "phaser";
import mainScene from "./scenes/mainScene";

// This is our configuration params, this can be put in a json file later
const config = {
  // How the canvas will be rendered
  type: Phaser.AUTO,
  // The width of our canvas
  width: 480,
  // The height of our canvas
  height: 640,
  // A background color
  backgroundColor: "black",
  // Physics params
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  // A list of keys for our scenes. We can define them here
  // or add them later on the go.
  // We will use just one scene.
  scene: [
    mainScene
  ]
};

// this is our game instance
const game = new Phaser.Game(config);