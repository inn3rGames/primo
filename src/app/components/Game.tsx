import {
  Container,
  Application,
  Text,
  TextStyleLineJoin,
  TextStyleAlign,
  Graphics,
} from "pixi.js";
import scaleToFit from "../utils/scaleToFit";
import isPrime from "../utils/isPrime";
import getRandomIntInclusive from "../utils/getRandomIntInclusive";
import arrayShuffle from "../utils/arrayShuffle";

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

  // Custom text styles
  const wonStyle = {
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
  const lostStyle = {
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
  const spinningStyle = {
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

  // Create numbers container
  const numbersContainer = new Container();
  app.stage.addChild(numbersContainer);

  // Hold all number entities
  interface NumberEntity {
    textObject: Text;
    collision: boolean;
    numberValue: number;
    lastPostion: number;
  }
  let numberEntities: Array<NumberEntity> = [];

  // Generate number sprites
  const spaceBetweenNumbers = 150;
  const createNumbers = (totalNumbers: number) => {
    // Enable random number order
    let initialOrder = [];
    for (let i = 1; i < 21; i++) {
      initialOrder.push(i);
    }
    let shuffledArray = arrayShuffle(initialOrder);

    for (let i = 1; i < totalNumbers + 1; i++) {
      const textObject = new Text();
      textObject.text = shuffledArray[i - 1].toString();
      if (isPrime(i) == true) {
        textObject.style = { ...wonStyle };
      } else {
        textObject.style = { ...lostStyle };
      }
      textObject.anchor.set(0.5, 0.5);
      textObject.x = (i - 3) * spaceBetweenNumbers + gameWidth / 2;
      textObject.y = gameHeight / 2 - 8;
      numbersContainer.addChild(textObject);

      const numberSprite: NumberEntity = {
        textObject: textObject,
        collision: false,
        numberValue: i,
        lastPostion: textObject.x,
      };

      numberEntities.push(numberSprite);
    }
  };
  createNumbers(20);

  // Center main container
  mainContainer.x = app.screen.width / 2;
  mainContainer.y = app.screen.height / 2;
  mainContainer.pivot.x = mainContainer.width / 2;
  mainContainer.pivot.y = mainContainer.height / 2;

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
  const title = new Text();
  title.text = "PRIMO";
  title.style = { ...spinningStyle };
  title.anchor.set(0.5);
  title.y = -gameHeight / 2 + title.height;
  uiContainer.addChild(title);

  // Create play text
  const play = new Text();
  play.text = "PLAY";
  play.style = { ...wonStyle };
  play.anchor.set(0.5);
  play.y = gameHeight / 2 - play.height;
  uiContainer.addChild(play);
  play.eventMode = "static";
  play.cursor = "pointer";

  let spin = false;
  let speed: number;
  let steps: number;

  const startSpin = () => {
    if (spin == false) {
      spin = true;
      steps = 20 + getRandomIntInclusive(5, 15);
      title.text = "SPINNING";
      title.style = { ...spinningStyle };

      // Fix precision errors
      for (let i = 0; i < numberEntities.length; i++) {
        const numberSprite = numberEntities[i];
        numberSprite.textObject.x =
          Math.round(
            (numberSprite.lastPostion - gameWidth / 2) / spaceBetweenNumbers
          ) *
            spaceBetweenNumbers +
          gameWidth / 2;
      }
    } else {
      return;
    }
  };

  const endSpin = (numberValue: number) => {
    spin = false;

    if (isPrime(numberValue) === true) {
      title.text = "WON";
      title.style = { ...wonStyle };
    } else {
      title.text = "LOST";
      title.style = { ...lostStyle };
    }

    // Remember last positions
    for (let i = 0; i < numberEntities.length; i++) {
      const numberSprite = numberEntities[i];
      numberSprite.lastPostion = numberSprite.textObject.x;
    }
  };

  play.addEventListener("pointerdown", () => {
    startSpin();
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
      speed = steps * 2;
      for (let i = 0; i < numberEntities.length; i++) {
        numberEntities[i].textObject.x -= delta * speed;

        // Reset collision and position when number gets offscreen
        if (
          numberEntities[i].textObject.x <=
          gameWidth / 2 - 3 * spaceBetweenNumbers
        ) {
          numberEntities[i].textObject.x =
            17 * spaceBetweenNumbers + gameWidth / 2;
          numberEntities[i].collision = false;
        }

        // Detect collision with chevrons
        if (
          numberEntities[i].textObject.x <= gameWidth / 2 &&
          numberEntities[i].collision === false
        ) {
          numberEntities[i].collision = true;
          steps -= 1;
          if (steps <= 0) {
            endSpin(numberEntities[i].numberValue);
          }
        }
      }
    } else {
      return;
    }
  });
};

export default Game;
