export default function(input) {
  let [ins, , ...rMap] = input;
  const map = new Map();
  for (let row of rMap) {
    const [o, L, R] = row
      .replaceAll(/(=\s|\(|,|\))/g, '')
      .split(' ');
    map.set(o, { L, R });
  }

  let i = 0;
  let curr = 'AAA';
  while (curr !== 'ZZZ') {
    const dir = ins[i % ins.length];
    curr = map.get(curr)[dir];
    i++;
  }

  return i;
}

export const expectedValue = 6;
