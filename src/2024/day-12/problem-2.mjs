export default function(input) {
  const rows = input.length;
  const cols = input[0].length;

  const visited = Array.from({ length: rows }, () => Array.from({ length: cols }, () => false));

  function countCorners(f, r, c) {
    let values = [];
    for (let nr = -1; nr <= 1; nr++) {
      for (let nc = -1; nc <= 1; nc++) {
        values.push(input[r + nr]?.[c + nc]);
      }
    }

    let corners = 0;
    // external corners
    if (f !== values[1] && f !== values[3]) corners++;
    if (f !== values[1] && f !== values[5]) corners++;
    if (f !== values[7] && f !== values[3]) corners++;
    if (f !== values[7] && f !== values[5]) corners++;

    // internal corners
    if (f === values[1] && f === values[3] && f !== values[0]) corners++;
    if (f === values[1] && f === values[5] && f !== values[2]) corners++;
    if (f === values[7] && f === values[3] && f !== values[6]) corners++;
    if (f === values[7] && f === values[5] && f !== values[8]) corners++;

    return corners;
  }

  function traverse(f, r, c) {
    let area = 1;
    let corners = countCorners(f, r, c);
    visited[r][c] = true;
    [
      [r - 1, c],
      [r, c + 1],
      [r + 1, c],
      [r, c - 1],
    ].forEach(([nr, nc]) => {
        if (nr < 0 || nr >= rows) {
          return;
        }
        if (nc < 0 || nc >= cols) {
          return;
        }
        if (input[nr][nc] !== f) {
          return;
        }
        if (visited[nr][nc]) return;

        const { area: newArea, corners: newCorners } = traverse(f, nr, nc);
        area += newArea;
        corners += newCorners;
    });

    return { area, corners };
  }

  let result = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!visited[r][c]) {
        const { area, corners } = traverse(input[r][c], r, c);
        result += area * corners;
      }
    }
  }

  return result;
}

export const expectedValue = 1206;
