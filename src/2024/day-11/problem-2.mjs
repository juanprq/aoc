const TIMES = 75;

export default function(input) {
  const stones = input[0].split(' ');

  const memo = new Map();
  function traverse(stone, i = 0) {
    if (i === TIMES) return 1;
    if (memo.has(stone)) {
      const iMemo = memo.get(stone);
      if (iMemo.has(i)) return iMemo.get(i);
    }

    let result;
    if (stone === '0') {
      result = traverse('1', i + 1);
    } else if (stone.length % 2 === 0) {
      const midpoint = stone.length / 2;

      const a = parseInt(stone.slice(0, midpoint), 10).toString();
      const b = parseInt(stone.slice(midpoint), 10).toString();
      result = traverse(a, i + 1) + traverse(b, i + 1);
    } else {
      result = traverse((parseInt(stone, 10) * 2024).toString(), i + 1);
    }

    if (!memo.has(stone)) {
      memo.set(stone, new Map());
    }
    memo.get(stone).set(i, result);
    return result;
  }

  let result = 0;
  for (let s of stones) {
    result += traverse(s);
  }

  return result;
}

export const expectedValue = 55312;
