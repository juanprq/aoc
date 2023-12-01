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

  for (let i = offset; i < data.length; i++) {
    if (!isValid(i)) {
      return data[i];
    }
  }

  return 0;
}

export const expectedValue = 127;
