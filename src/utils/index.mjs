import fs from 'node:fs';
import path from 'node:path';

export function loadInputString(dirPath, fileName) {
  const result = fs
    .readFileSync(path.join(dirPath, fileName), 'utf8')
    .trim();

  return result;
}

export function loadInput(dirPath, fileName, separator = '\n') {
  const result = loadInputString(dirPath, fileName);
  return result.split(separator);
};

const print2DMatrix = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      process.stdout.write(matrix[i][j].toString());
    }

    process.stdout.write('\n');
  }
};

export function print3DMatrix(matrix, offset = 0) {
  for (let i = 0; i < matrix.length; i++) {
    console.log(`----- z = ${i - offset}`);
    print2DMatrix(matrix[i]);
  }
};

export function initialize2DMatrix(rows, cols, initialValue = 0) {
  const matrix = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i]) {
        matrix[i][j] = initialValue;
      } else {
        matrix[i] = [initialValue];
      }
    }
  }

  return matrix;
};

export function initialize3DMatrix(depth, rows, cols, initialValue = 0) {
  const matrix = [];
  for (let i = 0; i < depth; i++) {
    matrix[i] = initialize2DMatrix(rows, cols, initialValue);
  }

  return matrix;
};

export function initialize4DMatrix(hyper, depth, rows, cols, initialValue = 0) {
  const matrix = [];
  for (let i = 0; i < hyper; i++) {
    matrix[i] = initialize3DMatrix(depth, rows, cols, initialValue);
  }

  return matrix;
}

export function rotateLeft(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // interchange rows and cols
  const newMatrix = initialize2DMatrix(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      newMatrix[i][j] = matrix[j][cols - i - 1];
    }
  }

  return newMatrix;
}

export function rotateNLeft(matrix, n) {
  let result = matrix;

  for (i = 0; i < n; i++) {
    result = rotateLeft(result);
  }

  return result;
}
