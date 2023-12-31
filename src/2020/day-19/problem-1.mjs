export default function(inputs) {
  const rawRules = [];
  const rawInput = [];
  let next = false;
  for (let row of inputs) {
    if (next) {
      rawInput.push(row);
    } else {
      if (row === '') {
        next = true;
      } else {
        rawRules.push(row);
      }
    }
  }

  function parseRule(rawRule) {
    const [idx, tail] = rawRule.split(': ');
    let rules;
    if (tail.match(/[a-z]/)) {
      rules = tail.replace(/"/g, '');
    } else {
      rules = tail
        .split(' | ')
        .map((subRule) => subRule.split(' '));
    }

    return { idx, rules };
  }

  const rules = rawRules
    .map(parseRule)
    .reduce((accum, { idx, rules }) => {
      return { ...accum, [idx]: rules };
    }, {});

  function generateRegexp(rule = '0') {
    const currentRule = rules[rule];
    if (typeof currentRule === 'string') {
      return currentRule;
    } else {
      const regex = currentRule
        .map(subRule => subRule
          .map(generateRegexp).join('')
        ).join('|');

      return `(${regex})`;
    }
  }

  const regexp = new RegExp(`^${generateRegexp()}$`);
  const result = rawInput
    .map(v => regexp.test(v))
    .filter(v => v);

  return result.length;
}

export const expectedValue = 2;
