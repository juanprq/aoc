const ROWS = 103;
const COLS = 101;

// const ROWS = 7;
// const COLS = 11;

const MID_Y = ROWS >> 1;
const MID_X = COLS >> 1;

const SECONDS = 100;

export default function(input) {
  const quadrants = [0, 0, 0, 0];
  for (let r of input) {
    const regex = /p=(?<x>\d+),(?<y>\d+) v=(?<vx>(\+|-)?\d+),(?<vy>(\+|-)?\d+)/g;
    const match = regex.exec(r);

    const [x, y, vx, vy] = Object.values(match.groups).map(v => parseInt(v, 10));

    let nx = (SECONDS * vx + x) % COLS;
    if (nx < 0) {
      nx = COLS + nx;
    }

    let ny = (SECONDS * vy + y) % ROWS;
    if (ny < 0) {
      ny = ROWS + ny;
    }

    if (nx === MID_X || ny === MID_Y) continue;
    if (nx < MID_X && ny < MID_Y) {
      quadrants[0]++;
    } else if (nx > MID_X && ny < MID_Y) {
      quadrants[1]++;
    } else if (nx < MID_X && ny > MID_Y) {
      quadrants[2]++;
    } else if (nx > MID_X && ny > MID_Y) {
      quadrants[3]++;
    }
  }

  return quadrants.reduce((a, b) => a * b);
}

export const expectedValue = 12;
