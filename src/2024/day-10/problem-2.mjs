export default function(input) {
  const rows = input.length;
  const cols = input[0].length;

  function traverse(r, c) {
    const value = parseInt(input[r][c], 10);
    if (value === 9) return 1;

    let result = 0;
    [
      [r - 1, c],
      [r, c + 1],
      [r + 1, c],
      [r, c - 1],
    ].forEach(([nr, nc]) => {
        if (nr < 0 || nr >= rows) return;
        if (nc < 0 || nc >= cols) return;
        if (parseInt(input[nr][nc], 10) !== value + 1) return;

        result += traverse(nr, nc);
    });

    return result;
  }

  let result = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (input[r][c] === '0') {
        result += traverse(r, c);
      }
    }
  }

  return result;
}

export const expectedValue = 81;
