import { Container, Application, Text, TextStyleLineJoin } from "pixi.js";
import scaleToFit from "../utils/scaleToFit";

// Handle main game logic
const Game = async (app: Application) => {
  // Default stage options
  const gameWidth = 800;
  const gameHeight = 600;
  const backgroundColor = "#ADD8E6";
  app.renderer.background.color = backgroundColor;
  app.renderer.background.alpha = 0.75;

  // Create main container
  const mainContainer = new Container();
  app.stage.addChild(mainContainer);

  // Custom text style
  const customStyle = {
    fill: ["#FFD700", "#FFA500"],
    fontFamily: "Casino 3D Filled Marquee",
    fontSize: 100,
    stroke: "#FFFF00",
    strokeThickness: 3,
    lineJoin: "round" as TextStyleLineJoin,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowAlpha: 0.25,
    dropShadowBlur: 3,
  };

  // Create numbers container
  const numbersContainer = new Container();
  app.stage.addChild(numbersContainer);

  // Hold all numbers
  let numbers: Array<Text> = [];

  const createNumbers = (totalNumbers: number) => {
    for (let i = 0; i < totalNumbers + 1; i++) {
      const number = new Text();
      number.text = i.toString();
      number.style = { ...customStyle };
      number.y = -105 * i + gameHeight;
      numbersContainer.addChild(number);
      numbers.push(number);
    }
  };

  createNumbers(20);

  // Center main container
  mainContainer.x = app.screen.width / 2;
  mainContainer.y = app.screen.height / 2;
  mainContainer.pivot.x = mainContainer.width / 2;
  mainContainer.pivot.y = mainContainer.height / 2;

  // Center numbers container
  numbersContainer.x = app.screen.width / 2;
  numbersContainer.y = app.screen.height / 2;
  numbersContainer.pivot.x = numbersContainer.width / 2;
  numbersContainer.pivot.y = numbersContainer.height / 2;

  // Handle resize
  app.ticker.add(() => {
    const currentScale = scaleToFit(
      window.innerWidth,
      window.innerHeight,
      gameWidth,
      gameHeight
    );
    app.renderer.resize(gameWidth * currentScale, gameHeight * currentScale);
    app.stage.scale.set(currentScale);
  });

  // Main game update loop
  app.ticker.add((delta) => {
    numbersContainer.y += delta * 10;
    if (numbersContainer.y >= numbersContainer.height + gameHeight * 2) {
      numbersContainer.y = 0;
    }
  });
};

export default Game;
