"use client";

import { Stage } from "@pixi/react";
import GameContainer from "./GameContainer";

const NoSSRContainer = () => {
  return (
    <Stage width={400} height={400} options={{ background: 0xffffff }}>
      <GameContainer></GameContainer>
    </Stage>
  );
};

export default NoSSRContainer;
