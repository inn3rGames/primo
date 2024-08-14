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
      number.anchor.set(0.5, 0.5);
      number.x = (i - 1) * 150 + gameWidth / 2 - 0 * 150;
      number.y = gameHeight / 2 - 8;
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
  //numbersContainer.x = app.screen.width / 2;
  //numbersContainer.y = app.screen.height / 2;
  //numbersContainer.pivot.x = numbersContainer.width / 2;
  //numbersContainer.pivot.y = numbersContainer.height / 2;

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

  // Create chevron bottom
  const chevronBottom = new Graphics();
  chevronBottom.beginFill("#ADD8E6", 1);
  chevronBottom.moveTo(-30, 80);
  chevronBottom.lineTo(30, 80);
  chevronBottom.lineTo(0, -30 + 80);
  chevronBottom.lineTo(-30, 80);
  chevronBottom.closePath();
  chevronBottom.endFill();
  uiContainer.addChild(chevronBottom);

  // Create chevron top
  const chevronTop = new Graphics();
  chevronTop.beginFill("#ADD8E6", 1);
  chevronTop.moveTo(-30, -80);
  chevronTop.lineTo(30, -80);
  chevronTop.lineTo(0, +30 - 80);
  chevronTop.lineTo(-30, -80);
  chevronTop.closePath();
  chevronTop.endFill();
  uiContainer.addChild(chevronTop);

  // Create title text
  const titleStyle = {
    fill: ["#EE82EE", "#9932CC"],
    fontFamily: "Casino 3D Filled Marquee",
    fontSize: 100,
    align: "center" as TextStyleAlign,
    stroke: "#FFFFFF",
    strokeThickness: 3,
    lineJoin: "round" as TextStyleLineJoin,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowAlpha: 0.25,
    dropShadowBlur: 3,
  };

  const title = new Text();
  title.text = "PRIMO";
  title.style = { ...titleStyle };
  title.anchor.set(0.5);
  title.y = -gameHeight / 2 + title.height;
  uiContainer.addChild(title);

  // Create play text
  const playStyle = {
    fill: ["#FFA07A", "#FF0000"],
    fontFamily: "Casino 3D Filled Marquee",
    fontSize: 100,
    align: "center" as TextStyleAlign,
    stroke: "#FFFFFF",
    strokeThickness: 3,
    lineJoin: "round" as TextStyleLineJoin,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowAlpha: 0.25,
    dropShadowBlur: 3,
  };

  const play = new Text();
  play.text = "PLAY";
  play.style = { ...playStyle };
  play.anchor.set(0.5);
  play.y = gameHeight / 2 - play.height;
  uiContainer.addChild(play);

  let spin = false;
  let speed = 50;
  play.eventMode = "static";
  play.cursor = "pointer";
  play.addEventListener("pointerdown", () => {
    spin = true;
  });

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
    if (spin == true) {
      for (let i = 0; i < numbers.length; i++) {
        numbers[i].x -= delta * speed;

        if (numbers[i].x <= gameWidth / 2 - 450) {
          numbers[i].x = (18 - 1) * 150 + gameWidth / 2;
        }
      }

      speed -= 0.5 * delta;

      if (speed <= 0) {
        speed = 50;
        spin = false;
      }
    } else {
      return;
    }
  });
};

export default Game;
