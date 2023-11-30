export default function(input) {
  const data = input.map(v => parseInt(v, 10));

  const numberIndexes = data.reduce((accum, key) => {
    accum[key] = true;
    return accum;
  }, []);

  const findSumOf = (n) => {
    let numbers;
    for (let i = 0; i < data.length; i++) {
      const number = data[i];
      const complement = n - data[i];

      if (numberIndexes[complement]) {
        numbers = [number, complement];
        break;
      }
    }

    return numbers;
  };

  let result;
  for (let i = 0; i < data.length; i++) {
    const number1 = data[i];
    const complement = 2020 - number1;

    const numbers = findSumOf(complement);
    if (numbers) {
      result = [number1, ...numbers];
    }
  }

  return result.reduce((a, b) => a * b);
}

export const expectedValue = 241861950;
