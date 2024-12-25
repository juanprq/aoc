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
  const lowestScore = new Map();
  let minScore = Infinity;

  heap.enqueue({ r: sr, c: sc, rd: 0, cd: 1, score: 0, path: [] });
  lowestScore.set(getKey(sr, sc, 0, 1), 0);

  const paths = [];
  while (!heap.isEmpty()) {
    const { r, c, rd, cd, score, path } = heap.dequeue();
    const key = getKey(r, c, rd, cd);

    if (score > lowestScore.get(key) ?? Infinity) continue;
    lowestScore.set(key, score);

    if (board[r][c] === 'E') {
      if (score > minScore) break; // there are no more optimal solutions, we can break
      minScore = score;

      paths.push([...path, [r, c]]);
    }

    [
      [r + rd, c + cd, rd, cd, score + 1],
      [r, c, -cd, rd, score + 1000],
      [r, c, cd, -rd, score + 1000],
    ].forEach(([nr, nc, nrd, ncd, nScore]) => {
        if (board[nr][nc] === '#') return;
        if (score > lowestScore.get(getKey(nr, nc, nrd, ncd)) ?? Infinity) return;

        heap.enqueue({ r: nr, c: nc, rd: nrd, cd: ncd, score: nScore, path: [...path, [nr, nc]] });
    });
  }

  const nodes = new Set();
  for (let path of paths) {
    for (let [r, c] of path) {
      nodes.add(`${r},${c}`);
    }
  }

  return nodes.size;
}

export const expectedValue = 64;
