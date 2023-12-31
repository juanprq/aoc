import { print2DMatrix, initializeMatrix } from '../../utils/index.mjs';

export default function(input) {
  let data = input
    .map(row => {
      return row
        .split('')
        .map(v => parseInt(v, 10));
    });

  print2DMatrix(data);

  const rows = data.length;
  const cols = data[0].length;

  const getAdjacentPoints = (r, c) => {
    const points = [
      [r - 1, c - 1],
      [r - 1, c],
      [r - 1, c + 1],
      [r, c -1],
      [r, c + 1],
      [r + 1, c - 1],
      [r + 1, c],
      [r + 1, c + 1],
    ].filter(([row, col]) => (row >= 0 && row < rows && col >= 0 && col < cols));

    return points;
  }

  const iterations = 100;
  let flashesCount = 0;
  for (let i = 0; i < iterations; i++) {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        data[r][c]++;
      }
    }

    const flashes = initializeMatrix([rows, cols], false);

    const determineFlashes = (r, c) => {
      if (flashes[r][c]) return;
      if (data[r][c] <= 9) return;
      flashes[r][c] = true;
      flashesCount++;
      const points = getAdjacentPoints(r, c);
      for (let j = 0; j < points.length; j++) {
        const [cr, cc] = points[j];
        data[cr][cc]++;
      }

      for (let j = 0; j < points.length; j++) {
        const [cr, cc] = points[j];
        determineFlashes(cr, cc);
      }
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        determineFlashes(r, c);
      }
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (data[r][c] > 9) data[r][c] = 0;
      }
    }

    console.log(`Iteration: ${i + 1}`);
    print2DMatrix(data);
  }

  return flashesCount;
}

export const expectedValue = 1656;
