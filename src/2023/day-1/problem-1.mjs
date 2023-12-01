export default function(input) {

  const numbers = [];
  for (let row of input) {
    let first;
    let last;
    for (let v of row) {
      if (v.match(/\d/)) {
        if (!first) first = v;
        last = v;
      }
    }

    numbers.push(parseInt(first + last, 10));
  }

  return numbers.reduce((a, b) => a + b);
}

export const expectedValue = 142;
