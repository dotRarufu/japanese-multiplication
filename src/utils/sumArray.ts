export const sumArray = (numbers: number[]): number => {
  return numbers.reduce((acc, current) => acc + current, 0);
};
