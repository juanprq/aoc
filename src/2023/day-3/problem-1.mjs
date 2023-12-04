export default function(input) {
  const rows = input.length;
  const cols = input[0].length;

  function searchNumber(r, c) {
    let lc = c;
    let num = '';
    while (lc < cols && input[r][lc].match(/\d/)) {
      num += input[r][lc];
      lc++;
    }

    lc--;

    // how to generate the perimeter?
    const ir = Math.max(0, r - 1);
    const ic = Math.max(0, c - 1);
    const er = Math.min(rows - 1, r + 1);
    const ec = Math.min(cols - 1, lc + 1);

    for (let i = ir; i <= er; i++) {
      for (let j = ic; j <= ec; j++) {
        if (input[i][j] !== '.' && input[i][j].match(/\D/)) {
          return parseInt(num, 10);
        }
      }
    }

    return null;
  };

  const numbers = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // determine if it's a number first
      const value = input[r][c];
      if (
        value.match(/\d/)
        && (
          c - 1 === -1
          || input[r][c - 1].match(/\D/)
        )
      ) {
        const result = searchNumber(r, c);
        if (result !== null) {
          numbers.push(parseInt(result, 10));
        }
      }
    }
  }

  return numbers.reduce((a, b) => a + b);
}

export const expectedValue = 4361;
