export default function(input) {
  const listA = [];
  const mapB = new Map();

  for (let row of input) {
    const [a, b] = row.split(/\s+/).map(a => parseInt(a, 10));
    listA.push(a);

    const count = mapB.get(b) ?? 0;
    mapB.set(b, count + 1);
  }

  let result = 0;
  for (let a of listA) {
    const count = mapB.get(a) ?? 0;

    result += a * count;
  }

  return result;
}

export const expectedValue = 31;
