export default function(input) {
  const [head, _, ...rest] = input;
  const seedRanges = head
    .split(': ')[1]
    .split(' ')
    .map(v => parseInt(v, 10))
    .reduce((accum, value) => {
      if (accum.length === 0 || accum[accum.length - 1].length === 2) {
        accum.push([]);
      }
      accum[accum.length - 1].push(value);
      return accum;
    }, [])
    .map(([s, l]) => [s, s + l - 1])
    .sort((a, b) => a[0] - b[0]);

  // lets get the other ranges
  let cRanges = [...seedRanges];
  let count = 0;
  for (let i = 0; i < rest.length; i++) {
    count++;
    const ranges = [];
    i++;
    while (i < rest.length && rest[i] !== '') {
      const [t, s, l] = rest[i]
        .split(' ')
        .map(v => parseInt(v, 10));
      ranges.push({ range: [s, s + l - 1], offset: t - s });
      i++;
    }
    ranges.sort((a, b) => a.range[0] - b.range[0]);

    // now convert each range in the original array into the next one
    const newRanges = [];
    for (let r of cRanges) {
      let added = false;
      for (let { range: cr } of ranges) {
        if ((r[0] >= cr[0] && r[0] <= cr[1]) || (r[1] >= cr[0] && r[1] <= cr[1]))  {
          const part1 = [r[0], cr[0] - 1];
          const part2 = [Math.max(r[0], cr[0]), Math.min(r[1], cr[1])];
          const part3 = [cr[1] + 1, r[1]];

          if (part1[0] <= part1[1]) newRanges.push(part1);
          if (part2[0] <= part2[1]) newRanges.push(part2);
          if (part3[0] <= part3[1]) newRanges.push(part3);
          added = true;
          break;
        }
      }

      if (!added) {
        newRanges.push([...r]);
      }
    }

    const result = newRanges.map(r => {
      for (let { range: cr, offset } of ranges) {
        if (r[0] >= cr[0] && r[0] <= cr[1]) {
          return r.map(v => v + offset);
        }
      }

      return r;
    });
    result.sort((a, b) => a[0] - b[0]);
    cRanges = result;
  }

  return Math.min(
    ...cRanges.map(([l]) => l),
  );
}

export const expectedValue = 46;
