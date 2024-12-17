export default function(input) {
  const rows = input.length;
  const cols = input[0].length;

  const visited = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));

  function traverse(f, r, c) {
    let area = 1;
    let perimeter = 0;
    visited[r][c] = true;
    [
      [r - 1, c],
      [r, c + 1],
      [r + 1, c],
      [r, c - 1],
    ].forEach(([nr, nc]) => {
        if (nr < 0 || nr >= rows) {
          perimeter++;
          return;
        }
        if (nc < 0 || nc >= cols) {
          perimeter++;
          return;
        }
        if (input[nr][nc] !== f) {
          perimeter++;
          return;
        }
        if (visited[nr][nc]) return;

        const { area: newArea, perimeter: newPerimeter } = traverse(f, nr, nc);
        area += newArea;
        perimeter += newPerimeter;
    });

    return { area, perimeter };
  }

  let result = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!visited[r][c]) {
        const { area, perimeter } = traverse(input[r][c], r, c);
        result += area * perimeter;
      }
    }
  }

  return result;
}

export const expectedValue = 1930;
