"use client";

import dynamic from "next/dynamic";

const GameWithNoSSR = dynamic(() => import("./components/Game"));

export default function Home() {
  return (
    <div id="game-container">
      <GameWithNoSSR></GameWithNoSSR>
    </div>
  );
}
