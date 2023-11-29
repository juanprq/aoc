function parseInput(row) {
  const stringValues = row.split('');
  return stringValues.map(value => parseInt(value, 10));
};

function findMostCommonBitInPosition(data, position) {
  let accum = 0;
  for (let i = 0; i < data.length; i++) {
    accum += data[i][position];
  }

  return accum >= data.length / 2 ? 1 : 0;
};

export default function(input) {
  const data = input.map(parseInput);

  let oxygenGeneratorRating;
  let currentInstructions = [...data];
  for (let i = 0; i < data[0].length; i++) {
    const mostCommon = findMostCommonBitInPosition(currentInstructions, i);

    currentInstructions = currentInstructions
      .filter((instruction) => instruction[i] === mostCommon);

    if (currentInstructions.length === 1) {
      oxygenGeneratorRating = currentInstructions[0];
      break;
    }
  }

  let co2ScrubbingRating;
  currentInstructions = [...data];
  for (let i = 0; i < data[0].length; i++) {
    const leastCommon = findMostCommonBitInPosition(currentInstructions, i) === 1 ? 0 : 1;

    currentInstructions = currentInstructions
      .filter((instruction) => instruction[i] === leastCommon);

    if (currentInstructions.length === 1) {
      co2ScrubbingRating = currentInstructions[0];
      break;
    }
  }

  const oxygen = parseInt(oxygenGeneratorRating.join(''), 2);
  const co2 = parseInt(co2ScrubbingRating.join(''), 2);

  return oxygen * co2;
}

export const expectedValue = 230;
