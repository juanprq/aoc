// const DELIMITERS = [7, 27];
const DELIMITERS = [200000000000000, 400000000000000];

function findParameters({ p, v }) {
  const slope = v[1] / v[0];
  const intersect = p[1] - (slope * p[0]);

  return { slope, intersect };
}

function intersect(ea, eb) {
  const { slope: slopeA, intersect: intersectA } = findParameters(ea);
  const { slope: slopeB, intersect: intersectB } = findParameters(eb);

  const x = (intersectB - intersectA) / (slopeA - slopeB);
  const y = slopeA * x + intersectA;

  // TODO: Think this better
  if (ea.v[0] > 0) {
    if (x < ea.p[0]) return false;
  } else {
    if (x > ea.p[0]) return false;
  }

  if (eb.v[0] > 0) {
    if (x < eb.p[0]) return false;
  } else {
    if (x > eb.p[0]) return false;
  }

  const test = x >= DELIMITERS[0]
    && x <= DELIMITERS[1]
    && y >= DELIMITERS[0]
    && y <= DELIMITERS[1];

  return test;
}

export default function(input) {
  const data = input
    .map(r => {
      const [rp, rv] = r.split(' @ ');
      const p = rp
        .split(', ')
        .map(v => parseInt(v, 10));
      const v = rv
        .split(', ')
        .map(v => parseInt(v, 10));

      return { p, v };
    });

  let result = 0;

  for (let i = 0; i < data.length - 1; i++) {
    for (let j = i + 1; j < data.length; j++) {
      const ea = data[i];
      const eb = data[j];

      const test = intersect(ea, eb);
      if (test) result++;
    }
  }

  return result;
}

export const expectedValue = 2;
