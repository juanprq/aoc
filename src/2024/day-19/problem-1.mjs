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
    if (pattern === '') return true;
    if (cache.has(pattern)) return cache.get(pattern);

    for (let towel of towels) {
      const subP = pattern.slice(0, towel.length);
      if (subP === towel) {
        if (traverse(pattern.slice(towel.length))) {
          cache.set(pattern, true);
          return true;
        }
      }
    }

    cache.set(pattern, false);
    return false;
  }

  let result = 0;
  for (let p of patterns) {
    if (traverse(p)) {
      result++;
    }
  }

  return result;
}

export const expectedValue = 6;
