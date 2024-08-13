// Formula to preserve the aspect ratio regardless of the viewport size
const scaleToFit = (initialWidth: number, initialHeight: number): number => {
  const scale = Math.min(
    window.innerWidth / initialWidth,
    window.innerHeight / initialHeight
  );

  return scale;
};

export default scaleToFit;
