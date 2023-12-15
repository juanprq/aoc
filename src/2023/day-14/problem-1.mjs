export default function(input) {
  let data = input
    .map(r => r.split(''));
  const rows = data.length;
  const cols = data[0].length;

  let sum = 0;

  // rotate 90 deg counter clockwise
  data = data[0]
    .map((v, i) =>
      data
        .map(row => row[cols - i - 1])
    );
  // slide boulders
  data = data
    .map(row => row
      .join('')
      .split('#')
      .map(g => g.split('').sort().reverse().join(''))
      .join('#')
      .split('')
    );

  // rotate 90 deg clockwise
  data = data[0]
    .map((v, i) =>
      data
        .map(row => row[i])
        .reverse()
    );

  for (let r = 0; r < rows; r++) {
    sum += data[r].filter(v => v === 'O').length * (rows - r);
  }

  return sum;
}

export const expectedValue = 136;
