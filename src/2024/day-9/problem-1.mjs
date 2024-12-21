function pushMultiple(disk, toRepeat, times) {
  for (let i = 0; i < times; i++) {
    disk.push(toRepeat);
  }
}

export default function(input) {
  const diskMap = input[0];

  const disk = [];
  let i = 0;
  let id = 0;
  for (let char of diskMap) {
    const value = parseInt(char, 10);
    let toRepeat;
    if (i % 2 === 0) {
      toRepeat = id;
      id++;
    } else {
      toRepeat = -1;
    }

    pushMultiple(disk, toRepeat, value);
    i++;
  }

  let l = 0;
  let r = disk.length - 1;

  while (l < r) {
    while (disk[l] !== -1) l++;
    while (disk[r] === -1) r--;
    if (l > r) break;

    disk[l] = disk[r];
    disk[r] = -1;
  }

  const result = disk.reduce((accum, value, i) => {
    if (value === -1) return accum;

    return accum + value * i;
  }, 0);

  return result;
}

export const expectedValue = 1928;
