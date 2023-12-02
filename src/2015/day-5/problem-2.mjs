export default function(input) {
  let sum = 0;
  for (let string of input) {
    const double = string.match(/(\w\w).*\1/g);
    if (double === null) continue;

    const repeat = string.match(/(\w)\w\1/g);
    if (repeat === null) continue;

    sum++;
  }

  return sum;
}

export const expectedValue = 2;
