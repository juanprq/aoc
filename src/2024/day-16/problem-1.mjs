import { PriorityQueue } from '@datastructures-js/priority-queue';

export default function(input) {
  const board = input.map(row => row.split(''));

  const rows = board.length;
  const cols = board[0].length;

  let sr;
  let sc;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 'S') {
        sr = r;
        sc = c;
        break;
      }
    }
  }

  const getKey = (r, c, rd, cd) => `${r},${c}->${rd},${cd}`;

  const heap = new PriorityQueue((a, b) => a.score - b.score);
  const seen = new Set();

  heap.enqueue({ r: sr, c: sc, rd: 0, cd: 1, score: 0 });
  seen.add(getKey(sr, sc, 0, 1));

  while (!heap.isEmpty()) {
    const { r, c, rd, cd, score } = heap.dequeue();
    seen.add(getKey(r, c, rd, cd));

    if (board[r][c] === 'E') {
      return score;
    }

    [
      [r + rd, c + cd, rd, cd, score + 1],
      [r, c, -cd, rd, score + 1000],
      [r, c, cd, -rd, score + 1000],
    ].forEach(([nr, nc, nrd, ncd, nScore]) => {
        if (board[nr][nc] === '#') return;
        if (seen.has(getKey(nr, nc, nrd, ncd))) return;

        heap.enqueue({ r: nr, c: nc, rd: nrd, cd: ncd, score: nScore });
    });
  }
}

export const expectedValue = 11048;
