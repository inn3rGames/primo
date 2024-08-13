import { useEffect } from "react";
import { useApp } from "@pixi/react";
import Game from "./Game";

const GameContainer = () => {
  const app = useApp();

  useEffect(() => {
    app.stage.removeChildren();
    Game(app);
  }, [app]);

  return <></>;
};

export default GameContainer;
