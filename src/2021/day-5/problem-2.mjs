import { initializeMatrix, print2DMatrix } from '../../utils/index.mjs';

function parseInput(row) {
  const numbers = row.split(' -> ');
  return numbers.map((coordinate) => {
    return coordinate
      .split(',')
      .map(v => parseInt(v, 10));
  });
};

export default function(input) {
  const data = input.map(parseInput);

  const n = Math.max(
    ...data
      .flatMap(a => a)
      .flatMap(a => a)
  ) + 1;

  const countTracker = initializeMatrix([n, n], 0);

  for (let i = 0; i < data.length; i++) {
    const [[x1, y1], [x2, y2]] = data[i];

    if (x1 === x2 || y1 === y2) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
          countTracker[x][y]++;
        }
      }
    } else {
      let x = x1;
      let y = y1;

      while (true) {
        if (x > Math.max(x1, x2) || x < Math.min(x1, x2)) break;
        countTracker[x][y]++;

        if (x1 > x2) {
          x--;
        } else {
          x++;
        }

        if (y1 > y2) {
          y--;
        } else {
          y++;
        }
      }
    }
  }

  print2DMatrix(countTracker);

  let count = 0;
  for (let y = 0; y < countTracker.length; y++) {
    for (let x = 0; x <= countTracker[0].length; x++) {
      if (countTracker[y][x] > 1) {
        count++;
      }
    }
  }

  return count;
};

export const expectedValue = 12;
