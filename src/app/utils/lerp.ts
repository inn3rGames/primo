const lerp = (a1: number, a2: number, t: number): number => {
  return a1 * (1 - t) + a2 * t;
};

export default lerp;
