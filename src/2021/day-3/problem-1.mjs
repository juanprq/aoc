function parseInput(row) {
  const stringValues = row.split('');
  return stringValues.map(value => parseInt(value, 10));
};

export default function(input) {
  const data = input.map(parseInput);
  const n = data[0].length;

  const rates = data.reduce((accum, row) => {
    const result = [...accum];
    for (let i = 0; i < result.length; i++) {
      result[i] += row[i];
    }

    return result;
  }, new Array(n).fill(0));

  const gammaRate = rates.map(bit => {
    return bit > data.length / 2 ? 1 : 0;
  });
  const epsilonRate = rates.map(bit => {
    return bit > data.length / 2 ? 0 : 1;
  });

  const gamma = parseInt(gammaRate.join(''), 2);
  const epsilon = parseInt(epsilonRate.join(''), 2);

  return gamma * epsilon;
}

export const expectedValue = 198;
