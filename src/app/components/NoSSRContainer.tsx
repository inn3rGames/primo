"use client";

import { Stage } from "@pixi/react";
import GameContainer from "./GameContainer";

// Create container without SSR
const NoSSRContainer = () => {
  return (
    <Stage>
      <GameContainer></GameContainer>
    </Stage>
  );
};

export default NoSSRContainer;
