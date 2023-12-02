export default function(input) {
  let sum = 0;

  for (let box of input) {
    const dims = box
      .split('x')
      .map(v => parseInt(v, 10))
      .sort((a, b) => a - b);

    const product = dims.reduce((a, b) => a * b);
    sum += (2 * (dims[0] + dims[1]) + product);
  }

  return sum;
}

export const expectedValue = 34;
