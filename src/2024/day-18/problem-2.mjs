import { Queue } from '@datastructures-js/queue';
const LIMIT = 70;

// const LIMIT = 6;

export default function(input) {
  const bytes = input
    .map(row =>
      row
        .split(',')
        .map(v => parseInt(v, 10))
    );

  const board = Array
    .from(
      { length: LIMIT + 1 },
      () => Array.from({ length: LIMIT + 1 }, () => '.'),
    );

  function solve() {
    const visited = Array
      .from(
        { length: LIMIT + 1 },
        () => Array.from({ length: LIMIT + 1 }, () => false),
      );

    const queue = new Queue();
    queue.enqueue([0, 0, 0]);
    while (!queue.isEmpty()) {
      const [cr, cc, cs] = queue.dequeue();
      if (visited[cr][cc]) continue;

      if (cr === LIMIT && cc === LIMIT) {
        return cs;
      }

      visited[cr][cc] = true;

      [
        [cr - 1, cc],
        [cr, cc + 1],
        [cr + 1, cc],
        [cr, cc - 1],
      ].forEach(([nr, nc]) => {
        if (nr < 0 || nr > LIMIT) return;
        if (nc < 0 || nc > LIMIT) return;
        if (board[nr][nc] === '#') return;
        if (visited[nr][nc]) return;

        queue.enqueue([nr, nc, cs + 1]);
      });
    }

    return null;
  }

  for (let [c, r] of bytes) {
    board[r][c] = '#';

    const solution = solve();
    if (!solution) return `${c},${r}`;
  }

  return null;
}

export const expectedValue = '6,1';
