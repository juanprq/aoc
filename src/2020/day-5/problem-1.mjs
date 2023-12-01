function find([head, ...rest], lowerBound = 0, upperBound = 127) {
  if (!head) return upperBound;

  const mid = Math.floor((lowerBound + upperBound) / 2);
  if (head === 'F' || head === 'L') {
    return find(rest, lowerBound, mid);
  } else{
    return find(rest, mid, upperBound);
  }
};

function findSeat({ row: rowCode, col: colCode }) {
  const row = find(rowCode);
  const col = find(colCode, 0, 7);

  return { row, col };
}

function buildSeatID({ row, col }) {
  return row * 8 + col;
};

export default function(input) {
  const result = input
    .map(row => row.split(''))
    .map(row => {
      return {
        row: row.slice(0, 7),
        col: row.slice(7),
      }
    })
    .map(findSeat)
    .map(buildSeatID);

  return Math.max(...result);
}

export const expectedResult = 820;
