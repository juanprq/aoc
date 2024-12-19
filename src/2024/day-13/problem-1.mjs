function solve(x1, y1, x2, y2, tx, ty) {
  const b = (ty * x1 - tx * y1) / (y2 * x1 - y1 * x2);
  const a = (tx - b * x2) / x1;

  return { a, b };
}

export default function(input) {
  const problems = input
    .map(r => r === '' ? '\n' : r)
    .join('')
    .split('\n');

  let result = 0;
  for (let problem of problems) {
    const regex = /Button A: X(?<x1>(\+|\-)\d+), Y(?<y1>(\+|\-)\d+)Button B: X(?<x2>(\+|\-)\d+), Y(?<y2>(\+|\-)\d+)Prize: X=(?<tx>\d+), Y=(?<ty>\d+)/g;
    const match = regex.exec(problem);
    const [x1, y1, x2, y2, tx, ty] = Object.values(match.groups).map(v => parseInt(v, 10));

    const { a, b } = solve(x1, y1, x2, y2, tx, ty);
    if (a > 0 && a % 1 === 0 && b > 0 && b % 1 === 0) {
      result += a * 3 + b;
    }
  }

  return result;
}

export const expectedValue = 480;
