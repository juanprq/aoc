import { initializeMatrix, print2DMatrix } from '../../utils/index.mjs';

const DIRECTIONS = {
  U: ([r, c]) => [r - 1, c],
  R: ([r, c]) => [r, c + 1],
  D: ([r, c]) => [r + 1, c],
  L: ([r, c]) => [r, c - 1],
};

function countScore(m) {
  const rows = m.length;
  const cols = m[0].length;

  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (m[r][c]) count++;
    }
  }

  return count;
}

function sort(beams) {
  beams
    .sort((a, b) => {
      if (a.d === b.d) {
        if (a.p[0] === a.p[0]) {
          return a.p[1] - b.p[1];
        } else {
          return a.p[0] - b.p[0];
        }
      } else {
        return a.d.charCodeAt(0) - b.d.charCodeAt(0);
      }
    });
}

function getKey(beam) {
  return `${beam.d}=${beam.p.join(',')}`;
}

function getKeys(beams) {
  sort(beams);
  return beams
    .map(getKey)
    .join('#');
}

export default function(input) {
  const data = input;

  const rows = input.length;
  const cols = input[0].length;

  const energized = initializeMatrix([rows, cols], false);
  let beams = [{ d: 'R', p: [0, -1] }];

  const seen = new Set();
  while (beams.length > 0) {
    if (seen.has(getKeys(beams))) break;
    seen.add(getKeys(beams));

    const toDelete = [];
    const length = beams.length;
    for (let i = 0; i < length; i++) {
      const beam = beams[i];
      const { d, p } = beam;
      const np = DIRECTIONS[d](p);

      const [nr, nc] = np;
      if (nr < 0 || nr >= rows) {
        toDelete.push(i);
        continue;
      }
      if (nc < 0 || nc >= cols) {
        toDelete.push(i);
        continue;
      }

      energized[nr][nc] = true;
      beam.p = np;

      if (data[nr][nc] === '.') continue; // nothing to do

      const sym = data[nr][nc];
      switch(d) {
        case 'U':
          if (sym === '/') {
            beam.d = 'R';
          } else if (sym === '\\') {
            beam.d = 'L';
          } else if (sym === '-') {
            beam.d = 'R';
            beams.push({ d: 'L', p: np });
          }
          break;
        case 'R':
          if (sym === '/') {
            beam.d = 'U';
          } else if (sym === '\\') {
            beam.d = 'D';
          } else if (sym === '|') {
            beam.d = 'U';
            beams.push({ d: 'D', p: np });
          }
          break;
        case 'D':
          if (sym === '/') {
            beam.d = 'L';
          } else if (sym === '\\') {
            beam.d = 'R';
          } else if (sym === '-') {
            beam.d = 'R';
            beams.push({ d: 'L', p: np });
          }
          break;
        case 'L':
          if (sym === '/') {
            beam.d = 'D';
          } else if (sym === '\\') {
            beam.d = 'U';
          } else if (sym === '|') {
            beam.d = 'D';
            beams.push({ d: 'U', p: np });
          }
          break;
        default:
          throw new Error('impossimbobol!');
      }
    }

    beams = beams.filter((b, i) => !toDelete.includes(i));
    const cleanedBeams = new Map();
    for (let beam of beams) {
      cleanedBeams.set(getKey(beam), beam);
    }
    beams = Array.from(cleanedBeams.values());
  }

  const t = initializeMatrix([rows, cols], '.');
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (energized[r][c]) t[r][c] = '#';
    }
  }

  print2DMatrix(t);

  return countScore(energized);
}

export const expectedValue = 46;
