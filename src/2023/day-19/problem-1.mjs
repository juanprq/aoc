function applyRule(part, rule) {
  const { id, sym, val, out } = rule;
  const a = part.get(id);
  if (sym === '<') {
    return a < val ? out : null;
  } else if (sym === '>') {
    return a > val ? out: null;
  } else {
    throw new Error('imposimbobol!');
  }
}

function process(part, rulesObj) {
  const { d, rules } = rulesObj;

  for (let rule of rules) {
    const outcome = applyRule(part, rule);
    if (outcome !== null) return outcome;
  }

  return d;
}

export default function(input) {
  const rulesMap = new Map();
  const parts = [];
  let next = false;
  for (let row of input) {
    if (row === '') {
      next = true;
      continue;
    }

    if (next) {
      let obj = row.split('');
      obj.shift();
      obj.pop();
      obj = obj
        .join('')
        .split(',')
        .map(e => e.split('='))
        .map(([id, val]) => [id, parseInt(val, 10)]);

      parts.push(new Map(obj));
    } else {
      const match = row.match(/^(?<name>\w+)\{(?<rules>.+)\}/);
      let { name, rules } = match.groups;

      rules = rules
        .split(',')
      const d = rules.pop();
      rules = rules
        .map(r => {
          const match = r
            .match(/^(?<id>\w)(?<sym>\<|\>)(?<val>\d+)\:(?<out>\w+)/);
          const { id, sym, val, out } = match.groups;
          return { id, sym, val, out };
        });

      rulesMap.set(name, { d, rules });
    }
  }

  let sum = 0;
  for (let part of parts) {
    let out = 'in';

    while (!['A', 'R'].includes(out)) {
      const ruleObj = rulesMap.get(out);
      out = process(part, ruleObj);
    }

    if (out === 'A') {
      sum += Array.from(part.values()).reduce((a, b) => a + b);
    }
  }

  return sum;
}

export const expectedValue = 19114;
