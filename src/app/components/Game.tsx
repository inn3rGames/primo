import { Container, Sprite, Application, Texture } from "pixi.js";

const Game = (app: Application) => {
  const container = new Container();

  app.stage.addChild(container);

  // Create a new texture
  const texture = Texture.from("https://pixijs.com/assets/bunny.png");

  // Create a 5x5 grid of bunnies
  for (let i = 0; i < 25; i++) {
    const bunny = new Sprite(texture);

    bunny.anchor.set(0.5);
    bunny.x = (i % 5) * 40;
    bunny.y = Math.floor(i / 5) * 40;
    container.addChild(bunny);
  }

  

  // Listen for animate update
  app.ticker.add((delta) => {
    // rotate the container!
    // use delta to create frame-independent transform
    container.rotation -= 0.01 * delta;

    app.stage.scale.set(window.innerWidth / 400);

    // Move container to the center
    //container.x = app.screen.width / 2;
    //container.y = app.screen.height / 2;

    // Center bunny sprite in local container coordinates
    //container.pivot.x = container.width / 2;
    //container.pivot.y = container.height / 2;
  });
};

export default Game;
