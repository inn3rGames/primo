import { Stage, Sprite } from "@pixi/react";

const Game = () => {
  const bunnyUrl = "https://pixijs.io/pixi-react/img/bunny.png";
  return (
    <Stage width={400} height={400} options={{ background: 0x1099bb }}>
      <Sprite image={bunnyUrl} x={100} y={150} />
      <Sprite image={bunnyUrl} x={200} y={200} />
      <Sprite image={bunnyUrl} x={300} y={150} />
    </Stage>
  );
};

export default Game;
