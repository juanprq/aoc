const COLORS = 'red green blue'.split(' ');
const LIMITS = [12, 13, 14];

export default function(input) {
  const ids = [];
  for (let row of input) {
    const match = row.match(/^Game (?<game>\d+): (?<cubes>.*)/);
    const gameId = parseInt(match.groups['game'], 10);
    const cubesStr = match.groups['cubes'];

    const cubes = cubesStr
      .split(';')
      .flatMap(c => c.split(','))
      .map(s => {
        const match = s.trim().match(/^(?<count>\d+) (?<color>\w*)/);
        const {count, color} = match.groups;
        return [color, parseInt(count, 10)];
      })
      .reduce((accum, s) => {
        const idx = COLORS.findIndex(v => v === s[0]);
        accum[idx] = Math.max(accum[idx], s[1]);
        return accum
      }, [0, 0, 0]);

    if (
      cubes[0] <= LIMITS[0]
      && cubes[1] <= LIMITS[1]
      && cubes[2] <= LIMITS[2]
    ) {
      ids.push(gameId);
    }
  }

  return ids.reduce((a, b) => a + b);
}

export const expectedValue = 8;
