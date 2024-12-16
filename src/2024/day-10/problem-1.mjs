export default function(input) {
  const rows = input.length;
  const cols = input[0].length;

  function traverse(r, c, positions) {
    const value = parseInt(input[r][c], 10);
    if (value === 9) {
      positions.add(`${r},${c}`);
    }

    [
      [r - 1, c],
      [r, c + 1],
      [r + 1, c],
      [r, c - 1],
    ].forEach(([nr, nc]) => {
        if (nr < 0 || nr >= rows) return;
        if (nc < 0 || nc >= cols) return;
        if (parseInt(input[nr][nc], 10) !== value + 1) return;

        traverse(nr, nc, positions);
    });
  }

  let result = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (input[r][c] === '0') {
        const points = new Set();
        traverse(r, c, points);
        result += points.size;
      }
    }
  }

  return result;
}

export const expectedValue = 36;
