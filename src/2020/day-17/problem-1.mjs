import { initializeMatrix, print3DMatrix } from '../../utils/index.mjs';

export default function(input) {
  const data = input
    .map(row => row.split(''));

  const cycles = 6;
  const size = data.length + cycles * 2;
  const offset = Math.floor(size / 2);

  const initialMatrix = initializeMatrix([size, size, size], '.');

  let combinations = [];
  function buildCombinations(accum = []) {
    if (accum.length === 3) {
      combinations.push(accum);
      return;
    }

    [-1, 0, 1].forEach((idx) => buildCombinations([...accum, idx]));
  }
  buildCombinations();
  combinations = combinations.filter(([a, b, c]) => !(a === 0 && b === 0 && c === 0));

  function putWithOffset(matrix, value, z, y, x, offset) {
    matrix[z + offset][y + offset][x + offset] = value;
  }

  // copy initial state
  let localOffset = Math.floor(data.length / 2);
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      putWithOffset(initialMatrix, data[i][j], localOffset, i, j, offset - localOffset);
    }
  }

  function countValue(z, y, x, matrix) {
    if (z < 0 || y < 0 || x < 0) return 0;
    if (z >= size || y >= size || x >= size) return 0;

    if (matrix[z][y][x] === '#') return 1;
    return 0;
  }

  function countAdjacents(z, y, x, matrix) {
    return combinations
      .map(([dZ, dY, dX]) => {
        return countValue(z + dZ, y + dY, x + dX, matrix);
      })
      .reduce((a, b) => a + b);
  }

  function activate(matrix) {
    const newMatrix = initializeMatrix([size, size, size], '.');

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        for (let k = 0; k < size; k++) {
          const count = countAdjacents(i, j, k, matrix);
          const value = matrix[i][j][k];
          if (value === '#') {
            if (count === 2 || count === 3) {
              newMatrix[i][j][k] = '#';
            } else {
              newMatrix[i][j][k] = '.';
            }
          } else {
            if (count === 3) {
              newMatrix[i][j][k] = '#';
            } else {
              newMatrix[i][j][k] = '.';
            }
          }
        }
      }
    }

    return newMatrix;
  };

  let result = initialMatrix;
  for (let cycle = 0; cycle < cycles; cycle++) {
    result = activate(result);
  }

  print3DMatrix(result, offset);

  let resultCount = 0;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      for (let k = 0; k < size; k++) {
        if (result[i][j][k] === '#') {
          resultCount++;
        }
      }
    }
  }

  return resultCount;
}

export const expectedValue = 112;
