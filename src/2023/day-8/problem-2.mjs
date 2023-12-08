function lcm(a, b) {
  let max = Math.max(a, b);
  let min = Math.min(a, b);
  for (let i = max; ; i += max) {
    if (i % min === 0) return i;
  }
};

export default function(input) {
  let [ins, , ...rMap] = input;
  const map = new Map();
  const indexes = new Map();
  for (let i = 0; i < rMap.length; i++) {
    const row = rMap[i];

    const [o, L, R] = row
      .replaceAll(/(=\s|\(|,|\))/g, '')
      .split(' ');
    map.set(o, { L, R });
    indexes.set(o, i);
  }

  let curr = [];
  for (let node of Array.from(map.keys())) {
    if (node[2] === 'A') curr.push(node);
  }

  const reminders = [];
  for (let c of curr) {
    let i = 0;
    while (c[2] !== 'Z') {
      const dir = ins[i % ins.length];
      const next = map.get(c)[dir];
      c = next;
      i++;
    }

    reminders.push(i);
  }

  let rem = reminders[0];
  for (let i = 1; i < reminders.length; i++) {
    rem = lcm(rem, reminders[i]);
  }

  return rem;
}

export const expectedValue = 6;
