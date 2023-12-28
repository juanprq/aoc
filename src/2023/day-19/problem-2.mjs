function cloneRanges(range) {
  return {
    x: [...range.x],
    m: [...range.m],
    a: [...range.a],
    s: [...range.s],
  };
}

export default function(input) {
  const rulesMap = new Map();
  for (let row of input) {
    if (row === '') break;

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
        return { id, sym, val: parseInt(val, 10), out };
      });

    rulesMap.set(name, { d, rules });
  }

  const initialRanges = { x: [1, 4e3], m: [1, 4e3], a: [1, 4e3], s: [1, 4e3] };

  function traverse(out, ranges) {
    if (out === 'R') return 0;
    if (out === 'A') {
      return Object
        .values(ranges)
        .map(([s, e]) => Math.max(0, e - s + 1))
        .reduce((a, b) => a * b, 1);
    }

    const { rules, d } = rulesMap.get(out);

    // This is the cloned version of the range
    let result = 0;
    const dr = cloneRanges(ranges);

    for (let rule of rules) {
      const { id, sym, val } = rule;
      let tr = cloneRanges(dr);

      if (sym === '<') {
        // calculate the result for the true part
        tr[id][1] = Math.min(tr[id][1], val - 1);
        // Update the range of the false part
        dr[id][0] = Math.max(dr[id][0], val);
      } else if (sym === '>') {
        tr[id][0] = Math.max(tr[id][0], val + 1);
        dr[id][1] = Math.min(dr[id][1], val);
      } else {
        throw new Error('imposinbobol!');
      }

      result += traverse(rule.out, tr);
    }

    result += traverse(d, dr);

    return result;
  }
  return traverse('in', initialRanges);
}

export const expectedValue = 167409079868000;
