function parseRules(row) {
  const [, origin] = row.match(/(\w+\s\w+)\sbags/);
  const regexTarget =  /(\d+)\s(\w+\s\w+)\sbags?[\,\.]/g;

  const target = [];
  let match = regexTarget.exec(row);
  while (match !== null) {
    const [, quantity, bag] = match;
    target.push({
      quantity: parseInt(quantity, 10),
      bag,
    });

    match = regexTarget.exec(row);
  }

  return { origin, target };
};

export default function(input) {
  const rules = input
    .map(parseRules);

  const targetBag = 'shiny gold';

  function countBags(targetBag) {
    const rule = rules.find(({ origin }) => origin === targetBag);

    if (rule.target.length === 0) return 1;
    return 1 + rule
      .target
      .map(({ quantity, bag }) => quantity * countBags(bag))
      .reduce((a, b) => a + b);
  }

  const response = countBags(targetBag);
  return response - 1;
}

export const expectedValue = 32;
