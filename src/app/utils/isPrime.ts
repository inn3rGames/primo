const isPrime = (numberValue: number): boolean => {
  for (let i = 2, s = Math.sqrt(numberValue); i <= s; i++) {
    if (numberValue % i === 0) return false;
  }
  return numberValue > 1;
};

export default isPrime;
