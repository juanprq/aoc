const DIRECTIONS = {
  U: ([r, c]) => [r - 1, c],
  R: ([r, c]) => [r, c + 1],
  D: ([r, c]) => [r + 1, c],
  L: ([r, c]) => [r, c - 1],
};

const ID = { U: 'D', R: 'L', D: 'U', L: 'R' };

const SYMBOLS = {
  '|': ['U', 'D'],
  '-': ['L', 'R'],
  'L': ['U', 'R'],
  'J': ['U', 'L'],
  '7': ['L', 'D'],
  'F': ['R', 'D'],
};

function getKey([r, c]) {
  return `${r},${c}`;
}

export default function(maze) {
  const rows = maze.length;
  const cols = maze[0].length;

  let start;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (maze[r][c] === 'S') {
        start = [r, c];
        break;
      }
    }
  }

  const [sr, sc] = start;
  const queue = [];
  for (let [d, o] of Object.entries(DIRECTIONS)) {
    const id = ID[d];
    const [nr, nc] = o(start);

    if (nr < 0 || nr >= rows) continue;
    if (nc < 0 || nc >= cols) continue;

    const sym = maze[nr][nc];
    if (SYMBOLS[sym] === undefined) continue;
    if (SYMBOLS[sym].includes(id)) {
      queue.push([nr, nc]);
    }
  }

  // now, lets do a bfs in here...
  const visited = new Set();
  visited.add(getKey(start));

  while (queue.length > 0) {
    const l = queue.length;

    for (let i = 0; i < l; i++) {
      const p = queue.shift();
      visited.add(getKey(p));

      const sym = maze[p[0]][p[1]];
      const directions = SYMBOLS[sym];

      for (let d of directions) {
        const np = DIRECTIONS[d](p);

        const [nr, nc] = np;
        if (nr < 0 || nr >= rows) throw new Error('impossimbobol!');
        if (nc < 0 || nc >= cols) throw new Error('impoossimbobol!');
        if (SYMBOLS[maze[nr][nc]] === undefined) continue;
        if (visited.has(getKey(np))) continue;
        queue.push(np);
      }
    }
  }

  return visited.size / 2;
}

export const expectedValue = 8;
