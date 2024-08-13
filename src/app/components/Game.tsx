import { Container, Sprite, Application, Texture, Assets } from "pixi.js";
import scaleToFit from "../utils/scaleToFit";

// Handle main game logic
const Game = (app: Application) => {
  //Default stage options
  const gameWidth = 800;
  const gameHeight = 600;
  const backgroundColor = 0xffff00;
  app.renderer.background.color = backgroundColor;
  app.renderer.background.alpha = 0.90;
  console.log(app.renderer.background.alpha);

  // Create main container
  const mainContainer = new Container();
  app.stage.addChild(mainContainer);

  // Load texture
  const texture = Texture.from("https://pixijs.com/assets/bunny.png");

  // Create a 5x5 grid sprites grid
  for (let i = 0; i < 25; i++) {
    const sprite = new Sprite(texture);

    sprite.x = (i % 5) * 40;
    sprite.y = Math.floor(i / 5) * 40;
    mainContainer.addChild(sprite);
  }

  // Center main container
  mainContainer.x = app.screen.width / 2;
  mainContainer.y = app.screen.height / 2;
  mainContainer.pivot.x = mainContainer.width / 2;
  mainContainer.pivot.y = mainContainer.height / 2;

  app.ticker.add(() => {
    // Handle resize
    const currentScale = scaleToFit(
      window.innerWidth,
      window.innerHeight,
      gameWidth,
      gameHeight
    );
    app.renderer.resize(gameWidth * currentScale, gameHeight * currentScale);
    app.stage.scale.set(currentScale);
  });
};

export default Game;
