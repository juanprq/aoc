export default function(input) {
  let result = 0;

  const matches = input
    .join('')
    .matchAll(/((?<mul>mul\((?<a>\d{1,3}),(?<b>\d{1,3})\))|(?<dont>don't\(\))|(?<then>do\(\)))/gm);

  let enabled = true;
  for (let match of matches) {
    const { dont, then, a, b } = match.groups;

    if (dont) {
      enabled = false;
      continue;
    }
    if (then) {
      enabled = true;
      continue;
    }

    if (!enabled) continue;
    result += parseInt(a, 10) * parseInt(b, 10);
  }

  return result;
}

export const expectedValue = 48;
