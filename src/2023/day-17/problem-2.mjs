import { PriorityQueue } from '@datastructures-js/priority-queue';

const DIR = {
  U: ([r, c]) => [r - 1, c],
  R: ([r, c]) => [r, c + 1],
  D: ([r, c]) => [r + 1, c],
  L: ([r, c]) => [r, c - 1],
};

const POS = {
  U: ['U', 'L', 'R'],
  R: ['R', 'U', 'D'],
  D: ['D', 'L', 'R'],
  L: ['L', 'U', 'D'],
};

function getKey(element) {
  const { p, d, count } = element;
  return `${p.join(',')},${d},${count}`;
}

function process(data) {
  const rows = data.length;
  const cols = data[0].length;

  const heap = new PriorityQueue((a, b) => a.hl - b.hl);
  const seen = new Set();

  heap.enqueue({ hl: 0, p: [0, 0], d: null, count: 0 });
  while (heap.size() > 0) {
    const element = heap.dequeue();
    const { hl, p, d, count } = element;
    const [cr, cc] = p;

    if (cr === rows - 1 && cc === cols - 1 && count >= 4) return hl;

    const key = getKey(element);
    if (seen.has(key)) continue;

    seen.add(key);

    if (d === null) {
      heap.enqueue({ hl: data[cr][cc + 1], p: [cr, cc + 1], d: 'R', count: 1 });
      heap.enqueue({ hl: data[cr + 1][cc], p: [cr + 1, cc], d: 'D', count: 1 });
    } else if (count < 4) {
      // it needs to keep moving in the same direction
      const [nr, nc] = DIR[d](p);
      if (nr < 0 || nr >= rows) continue;
      if (nc < 0 || nc >= cols) continue;

      heap.enqueue({ hl: hl + data[nr][nc], p: [nr, nc], d, count: count + 1 });
    } else {
      const dirs = d === null ? ['R', 'D'] : POS[d];
      for (let nd of dirs) {
        const [nr, nc] = DIR[nd](p);
        if (nr < 0 || nr >= rows) continue;
        if (nc < 0 || nc >= cols) continue;
        if (nd === d && count === 10) continue;

        const newCount = d === nd ? count + 1 : 1;
        heap.enqueue({ hl: hl + data[nr][nc], p: [nr, nc], d: nd, count: newCount });
      }
    }
  }

  return 0;
}

export default function(input) {
  const data = input
    .map(r => r.split('').map(v => parseInt(v, 10)));

  return process(data);
}

export const expectedValue = 94;
