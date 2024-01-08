import { Queue } from '@datastructures-js/queue';
import { print2DMatrix } from '../../utils/index.mjs';

const STEPS = 64;
// const STEPS = 6;

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

  let count = 0;
  const queue = new Queue();
  queue.enqueue(sp);
  data[sp[0]][sp[1]] = 'X';
  count++;

  let steps = 0;
  while (steps < STEPS) {
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
        if ('#X'.includes(data[nr][nc])) return;
        data[nr][nc] = 'X';
        if (steps % 2 === 0) count++;

        queue.enqueue([nr, nc]);
      });
    }
  }
  print2DMatrix(data);
  return count;
}

export const expectedValue = 16;
