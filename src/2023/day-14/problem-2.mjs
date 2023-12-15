
export default function(input) {
  let data = input.map(row => row.split(''));
  const rows = data.length;
  const cols = data[0].length;

  function slide() {
    data = data
      .map(row =>
        row
          .join('')
          .split('#')
          .map(g => g.split('').sort().reverse().join(''))
          .join('#')
          .split('')
      )
  }

  function lRotate() {
    data = data[0]
      .map((v, i) => data.map(row => row[cols - i - 1]));
  }

  function rRotate() {
    data = data[0]
      .map((v, i) => data.map(row => row[i]).reverse());
  }

  function spin() {
    lRotate();

    slide(); // north facing west
    rRotate();

    slide(); // north facing north
    rRotate();

    slide(); // north facing east
    rRotate();

    slide(); // north facing south
    rRotate();
    rRotate();
  }

  function calculateLoad() {
    let sum = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (data[r][c] === 'O') {
          sum += (rows - r);
        }
      }
    }

    return sum;
  }

  const results = [];
  const store = new Map();
  let offset;
  let length;
  for (let i = 0; true; i++) {
    spin();
    const result = calculateLoad(data);
    results.push(result);

    const key = data.join('-');
    if (store.has(key)) {
      offset = store.get(key);
      length = i - offset;
      break;
    }

    store.set(key, i);
  }

  const index = (1e9 - offset) % length + offset - 1;
  return results[index];
}

export const expectedValue = 64;
