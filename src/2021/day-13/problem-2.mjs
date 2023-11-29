import { initializeMatrix, print2DMatrix } from '../../utils/index.mjs';

export default function(input) {
  const points = [];
  const folds = [];

  let rows = 0;
  let cols = 0;
  input.forEach((row) => {
    if (row.includes(',')) {
      const point = row
        .split(',')
        .map(v => parseInt(v, 10));

      if (point[1] > rows) rows = point[1];
      if (point[0] > cols) cols = point[0];

      points.push(point.reverse());
    } else if (row !== '') {
      const fold = row.split(' ')[2];
      const [axis, sValue] = fold.split('=');

      folds.push([axis, parseInt(sValue, 10)]);
    }
  });
  rows++;
  cols++;

  let matrix = initializeMatrix([rows, cols], '.');
  points.forEach(([r, c]) => {
    matrix[r][c] = '#';
  });

  folds.forEach(([axis, value]) => {
    let newRows = rows;
    let newCols = cols;
    if (axis === 'x') {
      newCols = value;
    } else {
      newRows = value;
    }

    const foldedMatrix = initializeMatrix([newRows, newCols], '.');

    if (axis === 'x') {
      for (let i = 0; i < newRows; i++) {
        matrix[i][value] = '|';
      }
    } else {
      for (let i = 0; i < newCols; i++) {
        matrix[value][i] = '-';
      }
    }

    for (let r = 0; r < newRows; r++) {
      for (let c = 0; c < newCols; c++) {
        foldedMatrix[r][c] = matrix[r][c];
      }
    }

    if (axis === 'y') {
      for (let r = value + 1; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const destinationRow = 2 * value - r;

          if (matrix[r][c] === '#') {
            foldedMatrix[destinationRow][c] = '#';
          }
        }
      }
    } else {
      for (let r = 0; r < rows; r++) {
        for (let c = value + 1; c < cols; c++) {
          const destinationCol = 2 * value - c;

          if (matrix[r][c] === '#')  {
            foldedMatrix[r][destinationCol] = '#';
          }
        }
      }
    }

    matrix = foldedMatrix;
    rows = newRows;
    cols = newCols;
  });

  print2DMatrix(matrix);

  return 0;
}

export const expectedValue = 0;
