const multiplyArrays = (arrayA: number[], arrayB: number[]) => {
  const result: number[] = [];
  for (let i = 0; i < arrayA.length; i++) {
    for (let j = 0; j < arrayB.length; j++) {
      // console.log(`${arrayA[i]} x ${arrayB[j]} = ${arrayA[i] * arrayB[j]}`);
      result.push(arrayA[i] * arrayB[j]);
    }
  }

  // console.log('A:', [...result, ...result]);

  return (
    [...result, ...result].reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    ) / 2
  );
};

export default multiplyArrays;
