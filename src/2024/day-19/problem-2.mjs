export default function(input) {
  let towels;
  const patterns = [];

  let isPattern = false;
  for (let row of input) {
    if (row === '') {
      isPattern = true;
    } else if (isPattern) {
      patterns.push(row);
    } else {
      towels = row.split(', ');
    }
  }

  const cache = new Map();
  function traverse(pattern) {
    if (pattern === '') return 1;
    if (cache.has(pattern)) return cache.get(pattern);

    let count = 0;
    for (let towel of towels) {
      const subP = pattern.slice(0, towel.length);
      if (subP === towel) {
        count += traverse(pattern.slice(towel.length));
      }
    }

    cache.set(pattern, count);
    return count;
  }

  let result = 0;
  for (let p of patterns) {
    result += traverse(p);
  }

  return result;
}

export const expectedValue = 16;
