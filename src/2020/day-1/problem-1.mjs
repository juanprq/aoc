export default function(input) {
  const data = input
    .map(v => parseInt(v, 10));

  const numberIndexes = data.reduce((accum, key) => {
    accum[key] = true;
    return accum;
  }, []);

  let numbers;
  for (let i = 0; i < data.length; i++) {
    const number = data[i];
    const complement = 2020 - data[i];

    if (numberIndexes[complement]) {
      numbers = [number, complement];
      break;
    }
  }

  return numbers[0] * numbers[1];
}

export const expectedValue = 514579;
