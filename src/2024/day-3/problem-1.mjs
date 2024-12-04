export default function(input) {
  let result = 0;
  const matches = input
    .join('')
    .matchAll(/(?<mul>mul\((?<a>\d{1,3}),(?<b>\d{1,3})\))/gm);

  for (let match of matches) {
    const { a, b } = match.groups;
    result += parseInt(a, 10) * parseInt(b, 10);
  }

  return result;
}

export const expectedValue = 161;
