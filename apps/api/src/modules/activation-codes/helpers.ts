export const generateRandomNumber = (digitCount: number): number => {
  const start = Math.pow(10, digitCount - 1);
  const end = Math.pow(10, digitCount) - 1;

  return Math.floor(Math.random() * (end - start) + start);
};
