export default function(input) {
  const [rulesRaw, [, mineRaw], [, ...nearbyRaw]] = input
    .reduce((accum, row) => {
      if (row === '') {
        accum.push([]);
      } else {
        accum[accum.length - 1].push(row);
      }

      return accum;
    }, [[]])

  const mine = mineRaw.split(',').map(v => parseInt(v, 10));
  const nearby = nearbyRaw.map(ticket => ticket.split(',').map(v => parseInt(v, 10)));

  const parseRules = (textRule) => {
    const regex = /^([\w\s]+):\s(\d+)-(\d+)\sor\s(\d+)-(\d+)$/

    const match = regex.exec(textRule);
    const [, field, ...rules] = match;
    const [lowerA, upperA, lowerB, upperB]  = rules.map(v => parseInt(v, 10));

    return {
      field,
      rules: [
        { lower: lowerA, upper: upperA },
        { lower: lowerB, upper: upperB },
      ],
    };
  };

  const rules = rulesRaw.map(parseRules);
  const allRules = rules.map(r => r.rules).reduce((accum, v) => [...accum, ...v]);

  const isValid = (value) => {
    const result = allRules.some(({ lower, upper }) => {
      if (value >= lower && value <= upper) return true;
      return false;
    });

    return result;
  }

  // unify all the nearby tickets
  const result = nearby.reduce((accum, value) => {
    return [...accum, ...value];
  })
    .filter((v) => !isValid(v))
    .reduce((a, b) => a + b, 0);

  return result;
}

export const expectedValue = 71;
