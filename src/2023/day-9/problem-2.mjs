function allZeroes(data) {
  return data.every(v => v === 0);
}

function predict(data) {
  let curr = data;
  const first = [];
  first.push(curr[0]);

  while(!allZeroes(curr)) {
    const aux = [];
    for (let i = 1; i < curr.length; i++) {
      aux.push(curr[i] - curr[i - 1]);
    }

    curr = aux;
    first.push(curr[0]);
  }

  for (let i = first.length - 2; i >= 0; i--) {
    first[i] -= first[i + 1];
  }

  return first[0];
}

export default function(input) {
  let sum = 0;

  for (let row of input) {
    const data = row
      .split(' ')
      .map(v => parseInt(v, 10));

    const result = predict(data);
    sum += result;
  }

  return sum;
}

export const expectedValue = 2;
