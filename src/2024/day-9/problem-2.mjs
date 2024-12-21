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

  let spaceIndexes;
  function recalculateIndexes() {
    spaceIndexes = [];
    let openSpace = null;
    for (let i = 0; i < disk.length; i++) {
      if (disk[i] === - 1 && openSpace === null) {
        openSpace = i;
      }
      if (disk[i] !== -1 && openSpace !== null) {
        spaceIndexes.push([openSpace, i]);
        openSpace = null;
      }
    }
  }
  recalculateIndexes();

  let r = disk.length - 1;

  while (r > 0) {
    while (disk[r] === -1) r--;
    const id = disk[r];
    let lr = r;
    while (disk[lr] === id) lr--;

    // find a space
    const fileLength = r - lr;
    const space = spaceIndexes.find(([l, u]) => u - l >= fileLength && lr + 1 > l);
    if (!space) {
      r = lr;
      continue;
    }

    const [l] = space;
    for (let i = 0; i < fileLength; i++) {
      disk[l + i] = disk[lr + i + 1];
      disk[lr + i + 1] = -1;
    }

    recalculateIndexes();
  }

  const result = disk.reduce((accum, value, i) => {
    if (value === -1) return accum;

    return accum + value * i;
  }, 0);

  return result;
}

export const expectedValue = 2858;
