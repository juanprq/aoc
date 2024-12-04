export default function(input) {
  const rows = input.length;
  const cols = input[0].length;
  let result = 0;

  function countXMAS(r, c) {
    // It should return 1 or not
    const aDiag = input[r - 1][c - 1] + input[r][c] + input[r + 1][c + 1];
    if (!['MAS', 'SAM'].includes(aDiag)) return 0;

    const bDiag = input[r - 1][c + 1] + input[r][c] + input[r + 1][c - 1];
    if (!['MAS', 'SAM'].includes(bDiag)) return 0;
    return 1;
  }

  for (let r = 1; r < rows - 1; r++) {
    for (let c = 1; c < cols - 1; c++) {
      const value = input[r][c];
      if (value === 'A') {
        result += countXMAS(r, c);
      }
    }
  }

  return result;
}

export const expectedValue = 9;
