import {
  Container,
  Application,
  Text,
  TextStyleLineJoin,
  TextStyleAlign,
  Graphics,
} from "pixi.js";
import scaleToFit from "../utils/scaleToFit";

// Handle main game logic
const Game = async (app: Application) => {
  // Default stage options
  const gameWidth = 800;
  const gameHeight = 600;
  const backgroundColor = "#ADD8E6";
  app.renderer.background.color = backgroundColor;
  app.renderer.background.alpha = 0;

  // Create main container
  const mainContainer = new Container();
  app.stage.addChild(mainContainer);

  // Custom text style
  const customStyle = {
    fill: ["#FFD700", "#FFA500"],
    fontFamily: "Casino 3D Filled Marquee",
    fontSize: 100,
    align: "center" as TextStyleAlign,
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
    for (let i = 1; i < totalNumbers + 1; i++) {
      const number = new Text();
      number.text = i.toString();
      number.style = { ...customStyle };
      number.x = 0;
      number.y = -6;
      console.log(number.height);
      numbersContainer.addChild(number);
      numbers.push(number);
    }
  };

  createNumbers(1);

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

  // Create UI container
  const uiContainer = new Container();
  app.stage.addChild(uiContainer);

  // Center UI container
  uiContainer.x = app.screen.width / 2;
  uiContainer.y = app.screen.height / 2;
  uiContainer.pivot.x = uiContainer.width / 2;
  uiContainer.pivot.y = uiContainer.height / 2;

  // Create background rectangle
  const backgroundRectangle = new Graphics();
  backgroundRectangle.lineStyle(gameHeight, "#ADD8E6", 0.75, 1);
  backgroundRectangle.drawRoundedRect(-75, -75, 150, 150, 0);
  backgroundRectangle.endFill();
  uiContainer.addChild(backgroundRectangle);

  // Create center square
  const square = new Graphics();
  square.lineStyle(10, "#ADD8E6", 1, 0.5);
  square.drawRoundedRect(-75, -75, 150, 150, 5);
  square.endFill();
  uiContainer.addChild(square);


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
    /* numbersContainer.y += delta * 10;
    if (numbersContainer.y >= numbersContainer.height + gameHeight * 2) {
      numbersContainer.y = 0;
    } */
  });
};

export default Game;
