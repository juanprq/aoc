export default function(input) {
  const data = input
    .map(v => parseInt(v, 10));

  data.sort((a, b) => a - b);
  data.push(data[data.length - 1] + 3);

  // initialize with one possibilitie at position 0
  const memo = [1];
  for (let i = 0; i < data.length; i++) {
    let currentValue = data[i];
    memo[currentValue] = (memo[currentValue - 3] || 0)
      + (memo[currentValue - 2] || 0)
      + (memo[currentValue - 1] || 0);
  }

  return memo[data[data.length - 1]];
}

export const expectedValue = 19208;
