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
  const time = 
    parseInt(
      rawTimes
        .replace(/Time:\s+/, '')
        .replaceAll(/\s+/g, ''), 10
    );

  const distance =
    parseInt(
      rawDistances
        .replace(/Distance:\s+/, '')
        .replaceAll(/\s+/g, ''), 10
    );

  const positibilities = count(time, distance);
  return positibilities;
}

export const expectedValue = 71503;
