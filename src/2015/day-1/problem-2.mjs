export default function(input) {
  const [data] = input;
  let floor = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] === '(') {
      floor++;
    } else if (data[i] === ')') {
      floor--;
    }

    if (floor === -1) {
      return i + 1;
    }
  }

  throw new Error('impossible!');
}

export const expectedValue = 3;
