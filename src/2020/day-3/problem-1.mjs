export default function(input) {
  const data = input.map(row => row.split(''));

  const rows = data.length;
  const cols = data[0].length;

  function countTrees(i, j) {
    const x = j % cols;

    const char = data[i][x];
    const countTree = char === '#' ? 1 : 0;

    if (i === rows - 1) return countTree;

    return countTree + countTrees(i + 1, j + 3);
  };

  return countTrees(0, 0);
}

export const expectedValue = 7;
