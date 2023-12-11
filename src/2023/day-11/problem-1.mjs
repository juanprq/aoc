export default function(input) {
  const orows = input.length;
  const ocols = input[0].length;

  const galaxies = [];
  for (let r = 0; r < orows; r++) {
    for (let c = 0; c < ocols; c++) {
      if (input[r][c] === '#') galaxies.push([r, c]);
    }
  }

  const emptyRows = [];
  for (let r = 0; r < orows; r++) {
    if (!galaxies.some(([gr]) => gr === r)) emptyRows.push(r);
  }
  const emptyCols = [];
  for (let c = 0; c < ocols; c++) {
    if (!galaxies.some(([gr, gc]) => gc === c)) emptyCols.push(c);
  }

  for (let point of galaxies) {
    const rc = emptyRows.filter(r => r < point[0]).length;
    const cc = emptyCols.filter(c => c < point[1]).length;

    point[0] += rc;
    point[1] += cc;
  }

  function findDistance(p1, p2) {
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
  }

  let sum = 0;
  for (let i = 0; i < galaxies.length; i++) {
    const p1 = galaxies[i];
    for (let j = i + 1; j < galaxies.length; j++) {
      const p2 = galaxies[j];
      const d = findDistance(p1, p2);

      sum += d;
    }
  }

  return sum;
}

export const expectedValue = 374;
