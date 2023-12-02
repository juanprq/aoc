function getKey([x, y]) {
  return `${x},${y}`;
}

export default function(input) {
  const data = input[0];

  const position = [0, 0]; // x, y
  const houses = new Set();
  houses.add(getKey(position));

  for (let c of data) {
    if (c === '^') {
      position[1]++;
    } else if (c === '>') {
      position[0]++;
    } else if (c === 'v') {
      position[1]--;
    } else if (c === '<') {
      position[0]--;
    }

    houses.add(getKey(position));
  }

  return houses.size;
}

export const expectedValue = 4;
