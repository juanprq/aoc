function getValues(values, table) {
  const sv = values
    .map(v => {
      if (v.match(/\d+/)) return parseInt(v, 10);
      return table.get(v);
    });

  if (!sv.every(v => v !== undefined)) return { success: false };
  return { success: true, parsedValues: sv };
}

function operate({ values, target, op }, table) {
  const { success, parsedValues } = getValues(values, table);
  if (!success) return false;

  const max = 2 ** 16 - 1;
  const [a, b] = parsedValues;
  let result;
  switch (op) {
    case null:
      result = a;
      break;
    case 'NOT':
      result = max - a;
      break;
    case 'AND':
      result = a & b;
      break;
    case 'OR':
      result = a | b;
      break;
    case 'LSHIFT':
      result = (a << b) & max;
      break;
    case 'RSHIFT':
      result = a >> b;
      break;
    default:
      throw new Error('impossimbobol!');
  }

  table.set(target, result);
  return true;
}

export default function(input) {
  const table = new Map();
  const data = [];

  for (let row of input) {
    const d = row.split(' ');

    if (d[0] === 'NOT') {
      let [op, v, _, target] = d;
      data.push({ values: [v], target, op });
    } else if (['AND', 'OR', 'LSHIFT', 'RSHIFT'].includes(d[1])) {
      let [a, op, b, _, target] = d;
      data.push({ values: [a, b], target, op });
    } else {
      let [v, _, target] = d;
      data.push({ values: [v], target, op: null });
    }
  }

  const solved = new Set();
  while (table.get('a') === undefined) {
    for (let i = 0; i < data.length; i++) {
      if (solved.has(i)) continue;

      const success = operate(data[i], table);
      if (success) solved.add(i);
    }
  }

  const wireA = table.get('a');
  table.clear();
  solved.clear();
  // rewrite the data in a
  const bi = data.findIndex(({ op, target }) => op === null && target === 'b');
  data[bi].values = [wireA.toString()];

  while (table.get('a') === undefined) {
    for (let i = 0; i < data.length; i++) {
      if (solved.has(i)) continue;

      const success = operate(data[i], table);
      if (success) solved.add(i);
    }
  }

  return table.get('a');
}

export const expectedValue = 0;
