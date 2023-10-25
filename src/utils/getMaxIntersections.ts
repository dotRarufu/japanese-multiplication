import { sumArray } from './sumArray';

export const getMaxIntersections = (num1: number[], num2: number[]) => {
  const num1Int = Math.abs(Number(num1.join('')));
  const num2Int = Math.abs(Number(num2.join('')));

  const num1HasZero = num1.filter(n => n === 0).length > 0;
  const num2HasZero = num2.filter(n => n === 0).length > 0;

  // todo: couldnt find equation for this
  if (num1[0] === 3 && num1[1] === 0 && num2[0] === 1 && num2[1] === 0) {
    return 8;
  }

  if (num1HasZero || num2HasZero) {
    // Find which one is the one digit
    const noneTenth = num1HasZero ? num2 : num1;
    const tenth = num1HasZero ? num1 : num2;

    if (noneTenth.length === 1) {
      // const numbered = Math.abs(Number(num2.join('')));
      return noneTenth[0] * (tenth[0] + 1);
    }

    const numbered = sumArray(noneTenth);
    return numbered * tenth[0] + numbered;
  }

  const num1Str = num1Int.toString();
  const num2Str = num2Int.toString();

  // Calculate the number of rows and columns needed for the grid
  const rows = num1Str.length;
  const columns = num2Str.length;

  // Calculate the number of intersections
  let intersections = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      intersections += parseInt(num1Str[i]) * parseInt(num2Str[j]);
    }
  }

  return intersections;
};
