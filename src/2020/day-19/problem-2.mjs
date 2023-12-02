export default function(input) {
  const rawRules = [];
  const rawInput = [];
  let next = false;
  for (let row of input) {
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

    return {
      idx,
      rules,
    };
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
    } else if (rule === '8') {
      const regexp42 = generateRegexp('42');
      return `${regexp42}+`;
    } else if (rule === '11') {
      const regexp42 = generateRegexp('42');
      const regexp31 = generateRegexp('31');

      const regexps = [];
      for (let i = 1; i <= 10; i++) {
        regexps.push(`((${regexp42}){${i}}(${regexp31}){${i}})`);
      }

      return `(${regexps.join('|')})`;
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
    .filter(v => regexp.test(v))

  return result.length;
}

export const expectedValue = 2;
