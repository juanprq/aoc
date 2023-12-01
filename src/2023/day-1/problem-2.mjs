const nums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

export default function(input) {
  const numbers = [];
  for (let row of input) {
    let first;
    let last;

    for (let i = 0; i < row.length; i++) {
      if (row[i].match(/\d/)) {
        if (!first) first = row[i];
        last = row[i];
      } else {
        for (let n of nums) {
          if (row.slice(i, i + n.length) === n) {
            if (!first) first = n;
            last = n;
          }
        }
      }
    }

    if (nums.includes(first)) first = (nums.findIndex(v => v === first) + 1).toString();
    if (nums.includes(last)) last = (nums.findIndex(v => v === last) + 1).toString();
    numbers.push(parseInt(first + last, 10));
  }

  return numbers.reduce((a ,b ) => a + b);
}

export const expectedValue = 281;
