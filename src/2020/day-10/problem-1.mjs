export default function(input) {
  const data = input
    .map(v => parseInt(v, 10));

  data.sort((a, b) => a - b);

  const differences = [0, 0, 0, 0];

  for (let i = 1; i < data.length; i++) {
    const diff = data[i] - data[i - 1];

    differences[diff]++;
  }

  differences[data[0]]++;
  differences[3]++;

  return differences[1] * differences[3];
}

export const expectedValue = 35;
