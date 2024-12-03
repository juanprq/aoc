export default function(input) {
  let result = 0;
  for (let row of input) {
    const nums = row.split(' ').map(v => parseInt(v, 10));

    const deltas = [];
    for (let i = 0; i < nums.length - 1; i++) {
      deltas.push(nums[i + 1] - nums[i]);
    }

    if (
      (
        deltas.every(v => v < 0)
        || deltas.every(v => v > 0)
      ) && deltas.every(v => Math.abs(v) >= 1 && Math.abs(v) <= 3)
    ) {
      result++;
    }
  }

  return result;
}

export const expectedValue = 2;
