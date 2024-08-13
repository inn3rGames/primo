import { Container, Application, Text } from "pixi.js";
import scaleToFit from "../utils/scaleToFit";

// Handle main game logic
const Game = async (app: Application) => {
  //Default stage options
  const gameWidth = 800;
  const gameHeight = 600;
  const backgroundColor = "#ADD8E6";
  app.renderer.background.color = backgroundColor;
  app.renderer.background.alpha = 0.75;

  // Create main container
  const mainContainer = new Container();
  app.stage.addChild(mainContainer);

  const text1 = new Text();
  text1.text = "1";
  text1.style.fill = ["#FFD700", "#FFA500"];
  text1.style.fontFamily = "Casino 3D Filled Marquee";
  text1.style.fontSize = 100;
  text1.style.stroke = "#FFFF00";
  text1.style.strokeThickness = 3;
  text1.style.lineJoin = "round";
  text1.style.dropShadow = true;
  text1.style.dropShadowColor = "#000000";
  text1.style.dropShadowAlpha = 0.25;
  text1.style.dropShadowBlur = 3;

  mainContainer.addChild(text1);

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

    text1.updateText(false);
  });
};

export default Game;
