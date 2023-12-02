export default function(input) {
  let sum = 0;
  for (let box of input) {
    const [l, w, h] = box
      .split('x')
      .map(v => parseInt(v, 10));

    const calcs = [l * w,  w * h,  h * l];
    sum += 2 * calcs.reduce((a, b) => a + b) + Math.min(...calcs);
  }

  return sum;
}

export const expectedValue = 58;
