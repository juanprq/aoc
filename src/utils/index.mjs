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

export function print2DMatrix(matrix) {
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

export function initializeMatrix([d, ...others], initialValue = 0) {
  if (!d) return initialValue;

  return Array.from({ length: d }, () => initializeMatrix(others, initialValue));
}

export function rotateLeft(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // interchange rows and cols
  const newMatrix = initializeMatrix([cols, rows]);

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

export function calculateShoelaceArea(points) {
  let area = 0;

  for (let i = 0; i < points.length - 1; i++) {
    area += points[i][0] * points[i + 1][1] - points[i][1] * points[i + 1][0];
  }

  return Math.abs(area) / 2;
}
