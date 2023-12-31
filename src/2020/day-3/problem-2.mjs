export default function(input) {
  const data = input.map(v => v.split(''));

  const rows = data.length;
  const cols = data[0].length;

  const countTrees = (i, j, slope) => {
    const x = j % cols;

    const char = data[i][x];
    const countTree = char === '#' ? 1 : 0;

    if (i === rows - 1) return countTree;

    const [rowInc, colInc] = slope;
    return countTree + countTrees(i + rowInc, j + colInc, slope);
  };

  const result = [
    [1, 1],
    [1, 3],
    [1, 5],
    [1, 7],
    [2, 1],
  ]
    .map(slope => countTrees(0, 0, slope))
    .reduce((a, b) => a * b);

  return result;
}

export const expectedValue = 336;
