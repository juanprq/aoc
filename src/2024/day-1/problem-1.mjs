export default function(input) {
  const listA = [];
  const listB = [];

  for (let row of input) {
    const [a, b] = row.split(/\s+/).map(a => parseInt(a, 10));

    listA.push(a);
    listB.push(b);
  }

  listA.sort();
  listB.sort();

  let result = 0;
  for (let i = 0; i < listA.length; i++) {
    const a = listA[i];
    const b = listB[i];

    result += Math.abs(a - b);
  }

  return result;
}

export const expectedValue = 11;
