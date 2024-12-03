function validate(level) {
    const deltas = [];
    for (let i = 0; i < level.length - 1; i++) {
      deltas.push(level[i + 1] - level[i]);
    }

    if (
      (
        deltas.every(v => v < 0)
        || deltas.every(v => v > 0)
      ) && deltas.every(v => Math.abs(v) >= 1 && Math.abs(v) <= 3)
    ) {
    return true;
    }

  return false;
}

export default function(input) {
  let result = 0;
  for (let row of input) {
    const nums = row.split(' ').map(v => parseInt(v, 10));

    if (validate(nums)) {
      result++;
      continue;
    }

    let valid = false;
    console.log(nums);
    for (let i = 0; i < nums.length; i++) {
      const level = nums.slice(0, i).concat(nums.slice(i + 1));
      if (validate(level)) {
        valid = true;
        break;
      }
    }

    if (valid) {
      result++;
    }
  }

  return result;
}

export const expectedValue = 4;
