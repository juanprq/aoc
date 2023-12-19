const DIRS = 'RDLU'.split('');

export default function(input) {
  const data = [];

  for (let row of input) {
    const match = row.match(/^(?<ins>\w)\s(?<q>\d+)\s\(#(?<color>(\d|[a-f]){6})\)$/);
    const { color } = match.groups;

    // original
    const { ins, q } = match.groups;
    data.push({ ins, q: parseInt(q, 10) });
  }

  let coordinates = [[0, 0]];
  for (let { ins, q } of data) {
    const pp = coordinates[coordinates.length - 1];
    let np;
    switch (ins) {
      case 'U':
        np = [pp[0] - q, pp[1]];
        break;
      case 'R':
        np = [pp[0], pp[1] + q];
        break;
      case 'D':
        np = [pp[0] + q, pp[1]];
        break;
      case 'L':
        np = [pp[0], pp[1] - q];
        break;
      default:
        throw new Error('impossimbobol!');
    }
    coordinates.push(np);
  }

  // lets do the shoelace and try to figure why the calculus is wrong
  let sum1 = 0;
  let sum2 = 0;
  for (let i = 0; i < coordinates.length - 1; i++) {
    sum1 += coordinates[i][0] * coordinates[i + 1][1];
    sum2 += coordinates[i + 1][0] * coordinates[i][1];
  }

  return Math.abs(sum1 - sum2) / 2 + data.map(({ q }) => q).reduce((a, b) => a + b) / 2 + 1;
}

export const expectedValue = 62;
