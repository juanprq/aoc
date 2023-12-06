function count(time, distance) {
  const b = time * (-1);
  const c = distance;

  let x1 = (-b - (Math.sqrt(Math.pow(b, 2) - 4 * c))) / 2;
  let x2 = (-b + (Math.sqrt(Math.pow(b, 2) - 4 * c))) / 2;

  x1 = x1 % 1 === 0 ? x1 + 1 : Math.ceil(x1);
  x2 = x2 % 1 === 0 ? x2 - 1 : Math.floor(x2);

  return x2 - x1 + 1;
}

export default function(input) {
  const [rawTimes, rawDistances] = input;
  const times = rawTimes
    .replace(/Time:\s+/, '')
    .split(/\s+/)
    .map(v => parseInt(v, 10));

  const distances = rawDistances
    .replace(/Distance:\s+/, '')
    .split(/\s+/)
    .map(v => parseInt(v, 10));

  let result = 1;
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i];

    // find positibilities
    const positibilities = count(time, distance);
    result *= positibilities;
  }

  return result;
}

export const expectedValue = 288;
