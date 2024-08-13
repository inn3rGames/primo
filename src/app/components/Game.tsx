import { Container, Sprite, Application, Texture } from "pixi.js";
import scaleToFit from "../utils/scaleToFit";

// Handle main game logic
const Game = (app: Application) => {
  //Default stage options
  const gameWidth = 800;
  const gameHeight = 600;
  const backgroundColor = 0xffff00;

  app.renderer.background.color = backgroundColor;

  app.ticker.add((delta) => {
    // Handle resize
    const currentScale = scaleToFit(gameWidth, gameHeight);
    app.renderer.resize(gameWidth * currentScale, gameHeight * currentScale);
  });
};

export default Game;
