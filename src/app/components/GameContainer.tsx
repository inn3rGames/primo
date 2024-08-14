import { useEffect } from "react";
import { useApp } from "@pixi/react";
import Game from "./Game";

// Wrap the Pixi Game
const GameContainer = () => {
  const app = useApp();

  // Ensure access to the window object
  useEffect(() => {
    document.fonts.ready.then(() => {
      app.stage.removeChildren();
      Game(app);
    });
  }, [app]);

  return <></>;
};

export default GameContainer;
