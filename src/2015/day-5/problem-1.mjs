export default function(input) {
  let sum = 0;
  for (let string of input) {
    const vowels = string.match(/a|e|i|o|u/g);
    if (vowels === null || vowels.length < 3) continue;

    const repeated = string.match(/(\w)\1/g);
    if (repeated === null) continue;

    const filtered = string.match(/ab|cd|pq|xy/g);
    if (filtered !== null) continue;

    sum++;
  }

  // 234 is too low...
  // 328 is too high
  return sum;
}

export const expectedValue = 2;
