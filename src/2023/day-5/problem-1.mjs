export default function(input) {
  const [head, _, ...rest] = input;
  const seeds = head
    .split(': ')[1]
    .split(' ')
    .map(v => parseInt(v, 10));

  const table = new Map(); // [seed-id]: { soil: 1... };
  for (let seed of seeds) {
    table.set(seed, { seed });
  }

  const mappers = new Map();
  const order = [];
  for (let i = 0; i < rest.length; i++) {
    const match = rest[i].match(/^(?<source>\w+)-to-(?<destination>\w+)\smap:$/);
    const { source, destination } = match.groups;
    order.push(source);

    const rows = [];
    i++;
    while (i < rest.length && rest[i] !== '') {
      const mapper = rest[i]
        .split(' ')
        .map(v => parseInt(v, 10));
      rows.push(mapper);
      i++;
    }
    mappers.set(source, { destination, rows });
  }

  for (let source of order) {
    const { destination, rows } = mappers.get(source);
    for (let seed of seeds) {
      const mapping = table.get(seed);
      const value = mapping[source];

      let newValue = value;
      for (let row of rows) {
        const [d, s, r] = row;
        if (s <= value && value < s + r) {
          newValue = d + (value - s);
          break;
        }
      }
      table.set(seed, { ...mapping, [destination]: newValue });
    }
  }

  let result = Infinity;
  for (let [seed, mapping] of table) {
    result = Math.min(result, mapping.location);
  }

  return result;
}

export const expectedValue = 35;
