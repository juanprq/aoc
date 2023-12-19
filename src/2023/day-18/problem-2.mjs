import { calculateShoelaceArea } from '../../utils/index.mjs';
const DIRS = 'RDLU'.split('');

export default function(input) {
  const data = [];

  for (let row of input) {
    const match = row.match(/^(?<ins>\w)\s(?<q>\d+)\s\(#(?<color>(\d|[a-f]){6})\)$/);
    const { color } = match.groups;

    let q = parseInt(color.slice(0, 5), 16);
    let ins = parseInt(color.slice(5), 10);
    ins = DIRS[ins];

    data.push({ ins, q });
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

  const area = calculateShoelaceArea(coordinates);
  const bp = data.map(({ q }) => q).reduce((a, b) => a + b);
  // picks part
  const i = area - (bp >> 1) + 1; // half of the perimeter + 1;
  return bp + i;
}

export const expectedValue = 952408144115;
