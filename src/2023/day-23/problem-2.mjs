const SEPARATOR = '-';

function getKey(p) {
  return p.join(SEPARATOR);
}

function parseKey(key) {
  return key.split(SEPARATOR).map(v => parseInt(v, 10));
}

export default function(input) {
  const data = input.map(r => r.split(''));
  const rows = data.length;
  const cols = data[0].length;

  const sp = [0, 1];
  const ep = [rows - 1, cols - 2];

  const contractionPoints = [sp, ep];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (data[r][c] === '#') continue;

      const dirs = [
        [r - 1, c],
        [r, c + 1],
        [r + 1, c],
        [r, c - 1],
      ];

      let neighbors = 0;
      for (let [nr, nc] of dirs) {
        if (nr < 0 || nr >= rows) continue;
        if (nc < 0 || nc >= cols) continue;
        if (data[nr][nc] === '#') continue;
        neighbors++;
      }

      if (neighbors >= 3) {
        contractionPoints.push([r, c]);
      }
    }
  }

  // lets build an adjacency list
  const graph = new Map(contractionPoints.map(p => [getKey(p), new Map()]));

  for (let key of graph.keys()) {
    const stack = [];
    stack.push({ p: parseKey(key), c: 0 });

    const visited = new Set();
    visited.add(key);

    while (stack.length > 0) {
      const { p, c } = stack.pop();
      if (c !== 0 && contractionPoints.find(([r, c]) => r === p[0] && c === p[1])) {
        graph.get(key).set(getKey(p), c);
        continue;
      }

      // go through all directions.
      const [cr, cc] = p;
      const dirs = [
        [cr - 1, cc],
        [cr, cc + 1],
        [cr + 1, cc],
        [cr, cc - 1],
      ];

      for (let np  of dirs) {
        const [nr, nc] = np;
        if (nr < 0 || nr >= rows) continue;
        if (nc < 0 || nc >= cols) continue;
        if (data[nr][nc] === '#') continue;
        if (visited.has(getKey(np))) continue;

        visited.add(getKey(np));
        stack.push({ p: np, c: c + 1 });
      }
    }
  }

  let result = 0;
  const visited = new Set();
  function dfs(p, count = 0) {
    if (p === getKey(ep)) {
      result = Math.max(result, count);
      return;
    }
    if (visited.has(p)) return;

    visited.add(p);
    const adj = graph.get(p);
    for (let [k, cc] of adj.entries()) {
      dfs(k, count + cc);
    }
    visited.delete(p);
  }
  dfs(getKey(sp));

  return result;
}

export const expectedValue = 154;
