function getKey([x, y]) {
  return `${x},${y}`;
}

function updatePosition(p, c) {
  if (c === '^') {
    p[1]++;
  } else if (c === '>') {
    p[0]++;
  } else if (c === 'v') {
    p[1]--;
  } else if (c === '<') {
    p[0]--;
  }
}

export default function(input) {
  const data = input[0]
  const houses = new Set();

  const santa = [0, 0];
  const robo = [0, 0];
  houses.add(getKey(santa));

  for (let i = 0; i < data.length - 1; i += 2) {
    updatePosition(santa, data[i]);
    updatePosition(robo, data[i + 1]);

    houses.add(getKey(santa));
    houses.add(getKey(robo));
  }

  return houses.size;
}

export const expectedValue = 3;
