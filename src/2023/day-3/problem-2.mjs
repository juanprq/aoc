function getKey(r, c) {
  return `${r}-${c}`;
}

export default function(input) {
  const rows = input.length;
  const cols = input[0].length;

  function search(sr, sc) {
    const visited = new Set();
    const numbers = [];

    function consume(r, c) {
      visited.add(getKey(r, c));
      let num = input[r][c];
      let cc = c + 1;
      while (cc < cols && input[r][cc].match(/\d/)) {
        visited.add(getKey(r, cc));
        num += input[r][cc];
        cc++;
      }

      cc = c - 1;
      while (cc >= 0 && input[r][cc].match(/\d/)) {
        visited.add(getKey(r, cc));
        num = input[r][cc] + num;
        cc--;
      }

      return parseInt(num, 10);
    }

    for (let r = Math.max(sr - 1, 0); r <= Math.min(rows - 1, sr + 1); r++) {
      for (let c = Math.max(sc - 1, 0); c <= Math.min(cols - 1, sc + 1); c++) {
        if (!visited.has(getKey(r, c)) && input[r][c].match(/\d/)) {
          const number = parseInt(consume(r, c), 10);
          numbers.push(number);
        }
      }
    }

    if (numbers.length === 2) {
      return numbers[0] * numbers[1];
    }
    return 0;
  }

  let sum = 0
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // search for '*'
      if (input[r][c] === '*') {
        sum += search(r, c);
      }
    }
  }

  return sum;
}

export const expectedValue = 467835;
