export default function(input) {
  const data = input
    .map(v => parseInt(v, 10));

  let offset = 25;
  // let offset = 5;

  function isValid(current) {
    const target = data[current];
    const memo = {};

    for (let i = current - offset; i < current; i++) {
      memo[data[i]] = true;
    }

    for (let i = current - offset; i < current; i++) {
      const a = data[i];
      const complement = target - a;

      if (memo[complement]) {
        return true;
      }
    }

    return false;
  };

  let invalidIndex;

  for (let i = offset; i < data.length; i++) {
    if (!isValid(i)) {
      invalidIndex = i;
    }
  }

  function findWeakness(invalidIndex) {
    const target = data[invalidIndex];

    for (let i = 0; i < invalidIndex - 2; i++) {
      let accum = 0;
      for (let j = i; j < invalidIndex - 1; j++) {
        accum += data[j];

        if (accum > target) break;
        if (accum === target) {
          const slice = data.slice(i, j + 1);
          return Math.min(...slice) + Math.max(...slice);
        }
      }
    }
  }

  const solution = findWeakness(invalidIndex);
  return solution;
}


export const expectedValue = 62;
