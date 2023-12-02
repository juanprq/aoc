const COLORS = 'red green blue'.split(' ');

export default function(input) {
  let sum = 0;
  for (let row of input) {
    const match = row.match(/^Game (?<game>\d+): (?<cubes>.*)/);
    // const gameId = parseInt(match.groups['game'], 10);
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

    sum += cubes.reduce((a, b) => a * b);
  }

  return sum;
}

export const expectedValue = 2286;
