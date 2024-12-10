export default function(input) {
  const field = input.map(row => row.split(''));

  const rows = field.length;
  const cols = field[0].length;

  const antennaLocations = new Map();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const current = field[r][c];

      if (current !== '.') {
        if (!antennaLocations.has(current)) {
          antennaLocations.set(current, []);
        }

        antennaLocations.get(current).push([r, c]);
      }
    }
  }

  const antinodes = Array.from({ length: rows }, () => Array.from({ length: cols }, () => '.'));
  for (let points of antennaLocations.values()) {
    for (let i = 0; i < points.length - 1; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const [ra, ca] = points[i];
        const [rb, cb] = points[j];

        const rd = ra - rb;
        const cd = ca - cb;

        const candidates = [
          [ra + rd, ca + cd],
          [rb - rd, cb - cd],
        ];

        for (let [r, c] of candidates) {
          if (r < 0 || r >= rows) continue;
          if (c < 0 || c >= cols) continue;

          antinodes[r][c] = '#';
        }
      }
    }
  }

  let result = 0;
  for (let r of antinodes) {
    for (let v of r) {
      if (v === '#') result++;
    }
  }

  return result;
}

export const expectedValue = 14;
