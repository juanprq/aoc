import { Queue } from '@datastructures-js/queue';

const TOTAL_STEPS = 26501365;

function fillMatrix(m, sp, { stop, startEven } = {}) {
  const rows = m.length;
  const cols = m[0].length;

  const queue = new Queue;
  queue.enqueue(sp);
  m[sp[0]][sp[1]] = 'X';

  let count = startEven ? 1 : 0;
  let steps = 0;

  while (queue.size() > 0) {
    steps++;
    const n = queue.size();

    for (let i = 0; i < n; i++) {
      const cp = queue.dequeue();
      const [cr, cc] = cp;

      [
        [cr - 1, cc],
        [cr, cc + 1],
        [cr + 1, cc],
        [cr, cc - 1],
      ].forEach(([nr, nc]) => {
        if (nr < 0 || nr >= rows) return;
        if (nc < 0 || nc >= cols) return;
        if ('#X'.includes(m[nr][nc])) return;
        m[nr][nc] = 'X';

        if (steps % 2 === (startEven ? 0 : 1)) count++;

        queue.enqueue([nr, nc]);
      });
    }

    if (stop && m[stop[0]][stop[1]] === 'X') break;
  }

  return count++;
}

export default function(input) {
  const data = input
    .map(row => row.split(''));

  // rows and cols
  const rows = data.length;
  const cols = data[0].length;

  // find the first position
  let sp;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (data[r][c] === 'S') {
        sp = [r, c];
        data[r][c] = '.';
      }
    }
  }

  // can I do this with a cycle?
  const co = fillMatrix(data.map(r => [...r]), sp);
  const ce = fillMatrix(data.map(r => [...r]), sp, { startEven: true });

  // how many squares of even starting are, and how many of odd start are?
  const x = (TOTAL_STEPS - sp[0]) / rows - 1; // remove the last square because is half of it

  const oddSquares = ((x >> 1) * 2 + 1) ** 2;
  const evenSquares = (((x + 1) >> 1) * 2) ** 2;
 
  let total = oddSquares * co + evenSquares * ce;

  const test = data.map(r => [...r]);
  const uc = fillMatrix(test, [rows - 1, sp[1]], { stop: [0, sp[1]], startEven: true });
  const rc = fillMatrix(data.map(r => [...r]), [sp[0], 0], { stop: [sp[0], cols - 1], startEven: true });
  const bc = fillMatrix(data.map(r => [...r]), [0, sp[1]], { stop: [rows - 1, sp[1]], startEven: true });
  const lc = fillMatrix(data.map(r => [...r]), [sp[0], cols - 1], { stop: [sp[0], 0], startEven: true });

  total += (uc + rc + bc + lc);

  const key = x % 2 === 0 ? 'e' : 'o';
  const half = rows >> 1;
  const smallCorners = [
    { p: [0, 0], stop: [0, half] },
    { p: [0, cols - 1], stop: [0, half] },
    { p: [rows - 1, cols - 1], stop: [half, cols - 1] },
    { p: [rows - 1, 0], stop: [half, 0] },
  ].map(({ p, stop }) => ({
      o: fillMatrix(data.map(r => [...r]), p, { stop }),
      e: fillMatrix(data.map(r => [...r]), p, { stop, startEven: true }),
    }));

  smallCorners.forEach(corner => {
    const v = corner[key === 'o' ? 'e' : 'o'];
    total += v * (x + 1);
  });

  const corners = [
    { p: [0, 0], stop: [half, cols - 1] },
    { p: [0, cols - 1], stop: [rows - 1, half] },
    { p: [rows - 1, cols - 1], stop: [0, half] },
    { p: [rows - 1, 0], stop: [half, cols - 1] },
  ].map(({ p, stop }) => ({
      o: fillMatrix(data.map(r => [...r]), p, { stop }),
      e: fillMatrix(data.map(r => [...r]), p, { stop, startEven: true }),
    }));

  corners.forEach(corner => {
    const v = corner[key];
    total += v * x;
  });

  return total;
}

export const expectedValue = 167004;
