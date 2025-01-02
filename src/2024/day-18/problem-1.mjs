import { Queue } from '@datastructures-js/queue';
const LIMIT = 70;
const N_BYTES = 1024;

// const LIMIT = 6;
// const N_BYTES = 12;

export default function(input) {
  const bytes = input
    .slice(0, N_BYTES)
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
  for (let [c, r] of bytes) {
    board[r][c] = '#';
  }

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

  return 0;
}

export const expectedValue = 22;
