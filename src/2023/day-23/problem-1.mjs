const STONES = {
  '<': ([r, c]) => [r, c - 1],
  '>': ([r, c]) => [r, c + 1],
  '^': ([r, c]) => [r - 1, c],
  'v': ([r, c]) => [r + 1, c],
};

export default function(input) {
  const data = input.map(row => row.split(''));

  const rows = data.length;
  const cols = data[0].length;
  const sp = [0, 1];
  const ep = [rows - 1, cols - 2];

  let result = 0;
  function dfs([r, c], steps = 0) {
    if (r < 0 || r >= rows) return;
    if (c < 0 || c >= cols) return;
    if (!'.<>v^'.includes(data[r][c])) return;
    if (r === ep[0] && c === ep[1]) {
      result = Math.max(result, steps);
      return;
    }

    const prev = data[r][c];
    data[r][c] = 'O'; // marking the position as visited

    if (prev === '.') {
      const dirs = [
        [r - 1, c],
        [r, c + 1],
        [r + 1, c],
        [r, c - 1],
      ];
      for (let p of dirs) {
        dfs(p, steps + 1);
      }
    } else {
      dfs(STONES[prev]([r, c]), steps + 1);
    }

    data[r][c] = prev; // backtrack
  }
  dfs(sp);

  return result;
}

export const expectedValue = 94;
