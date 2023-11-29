export default function(input) {
  let data = input
    .map(row => {
      const [head] = row.split(' | ');
      return head.split(' ');
    });

  let count = 0;
  let something = [];
  for (let i = 0; i < data.length; i++) {
    const counter = data[i]
      .map(signal => signal.length)
      .reduce((accum, length) => ({ ...accum, [length]: true }), {});

    if (counter[2] && counter[4] && counter[3] && counter[7]) {
      something.push(true);
    } else {
      something.push(false);
    }
  }

  return count;
}

export const expectedValue = 26;
