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

    if (cr === rows - 1 && cc === cols - 1) return hl;

    const key = getKey(element);
    if (seen.has(key)) continue;

    seen.add(key);

    const dirs = d === null ? ['R', 'D'] : POS[d];
    for (let nd of dirs) {
      const [nr, nc] = DIR[nd](p);
      if (nr < 0 || nr >= rows) continue;
      if (nc < 0 || nc >= cols) continue;
      if (nd === d && count === 3) continue;

      const newCount = d === nd ? count + 1 : 1;
      heap.enqueue({ hl: hl + data[nr][nc], p: [nr, nc], d: nd, count: newCount });
    }
  }

  return 0;
}

export default function(input) {
  const data = input
    .map(r => r.split('').map(v => parseInt(v, 10)));

  return process(data);
}

export const expectedValue = 102;
