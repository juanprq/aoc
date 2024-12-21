const ROWS = 103;
const COLS = 101;

// const ROWS = 7;
// const COLS = 11;

const MID_X = COLS >> 1;
const MID_Y = ROWS >> 1;

const MAX_ITERATIONS = ROWS * COLS;

function getPosition(times, fn) {
  const { x, y, vx, vy } = fn;
  let nx = (times * vx + x) % COLS;
  if (nx < 0) {
    nx = COLS + nx;
  }

  let ny = (times * vy + y) % ROWS;
  if (ny < 0) {
    ny = ROWS + ny;
  }

  return { x: nx, y: ny };
}

function countQuadrants(points) {
  const quadrants = [0, 0, 0, 0];
  for (let { x, y } of points) {
    if (x === MID_X || y === MID_Y) continue;
    if (x < MID_X && y < MID_Y) {
      quadrants[0]++;
    } else if (x > MID_X && y < MID_Y) {
      quadrants[1]++;
    } else if (x < MID_X && y > MID_Y) {
      quadrants[2]++;
    } else if (x > MID_X && y > MID_Y) {
      quadrants[3]++;
    }
  }
  return quadrants;
}

export default function(input) {
  const robots = [];
  for (let r of input) {
    const regex = /p=(?<x>\d+),(?<y>\d+) v=(?<vx>(\+|-)?\d+),(?<vy>(\+|-)?\d+)/g;
    const match = regex.exec(r);

    const [x, y, vx, vy] = Object.values(match.groups).map(v => parseInt(v, 10));
    robots.push({ x, y, vx, vy });
  }

  let bestIteration = null;
  let minSf = Infinity;
  for (let i = 0; i < MAX_ITERATIONS + 1; i++) {
    const points = [];
    for (let r of robots) {
      const { x, y } = getPosition(i, r);
      points.push({ x, y });
    }

    const sf = countQuadrants(points).reduce((a, b) => a * b);
    if (sf < minSf) {
      minSf = sf;
      bestIteration = i;
    }
  }

  return bestIteration;
}

export const expectedValue = 12;
