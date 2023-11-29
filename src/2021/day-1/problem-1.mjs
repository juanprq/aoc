export default function(input) {
  const data = input
    .map(v => parseInt(v, 10));

  let count = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i] > data[i - 1]) count++;
  }

  return count;
};

export const expectedValue = 7;
