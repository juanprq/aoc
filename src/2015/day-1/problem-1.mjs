export default function(input) {
  const [data] = input;
  let floor = 0;
  for (let c of data) {
    if (c === '(') {
      floor++;
    } else if (c === ')') {
      floor--;
    }
  }

  return floor;
}

export const expectedValue = 3;
