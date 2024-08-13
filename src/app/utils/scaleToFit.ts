// Formula to preserve the aspect ratio regardless of the viewport size
const scaleToFit = (
  currentWidth: number,
  currentHeight: number,
  initialWidth: number,
  initialHeight: number
): number => {
  const scale = Math.min(
    currentWidth / initialWidth,
    currentHeight / initialHeight
  );

  return scale;
};

export default scaleToFit;
