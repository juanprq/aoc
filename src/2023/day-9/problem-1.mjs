function allZeroes(data) {
  return data.every(v => v === 0);
}

function predict(data) {
  let curr = data;
  const lasts = [];
  lasts.push(curr[curr.length - 1]);

  while(!allZeroes(curr)) {
    const aux = [];
    for (let i = 1; i < curr.length; i++) {
      aux.push(curr[i] - curr[i - 1]);
    }

    curr = aux;
    lasts.push(curr[curr.length - 1]);
  }

  // then operate with the lasts!
  for (let i = lasts.length - 2; i >= 0; i--) {
    lasts[i] += lasts[i + 1];
  }

  return lasts[0];
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

export const expectedValue = 114;
