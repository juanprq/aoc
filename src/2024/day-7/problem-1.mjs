export default function(input) {
  let result = 0;
  for (let row of input) {
    let [expected, numbers] = row.split(': ');

    expected = parseInt(expected, 10);
    numbers = numbers.split(' ').map(v => parseInt(v, 10));

    function traverse(i, rem) {
      if (i === numbers.length && rem === expected) return true;
      if (i >= numbers.length) return false;

      const current = numbers[i];
      if (traverse(i + 1, rem + current)) return true;
      return traverse(i + 1, rem * current);
    }

    if (traverse(1, numbers[0])) {
      result += expected;
    }
  }

  return result;
}

export const expectedValue = 3749;
