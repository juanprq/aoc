const CARDS_ORDER = 'A K Q T 9 8 7 6 5 4 3 2 J'.split(' ');
const TYPES_ORDER = '5 4 F 3 2 1 H'.split(' ');

function getType(hand) {
  const count = new Map();
  for (let c of hand) {
    if (!count.has(c)) count.set(c, 0);
    count.set(c, count.get(c) + 1);
  }

  const jc = count.get('J') ?? 0;
  count.set('J', 0);

  const values = Array
    .from(count.values())
    .sort((a, b) => b - a);
  values[0] += jc;

  // I think this is where the problem is...
  // think about possibilities in here...

  if (values[0] === 5) return '5';
  if (values[0] === 4) return '4';
  if (values[0] === 3 && values[1] === 2) return 'F';
  if (values[0] === 3) return '3';
  if (values[0] === 2 && values[1] === 2) return '2';
  if (values[0] === 2) return '1';

  return 'H';
}

function lo(a, b) {
  let i = 0;
  while (a[i] === b[i]) {
    i++;
  }

  if (i === a.length) return 0;
  const ai = CARDS_ORDER.findIndex(v => v === a[i]);
  const bi = CARDS_ORDER.findIndex(v => v === b[i]);
  const result = bi - ai;

  return result;
}

function go(a, b) {
  const aType = getType(a);
  const bType = getType(b);

  const ai = TYPES_ORDER.findIndex(v => v === aType);
  const bi = TYPES_ORDER.findIndex(v => v === bType);
  if (ai === bi) return lo(a, b);
  return bi - ai;
}

export default function(input) {
  const hands = input
    .map(row => {
      const [h, b] = row.split(' ');
      return [h, parseInt(b, 10)];
    });

  hands.sort((a, b) => {
    return go(a[0], b[0]);
  });

  let result = 0;
  for (let i = 0; i < hands.length; i++) {
    result += hands[i][1] * (i + 1);
  }

  return result;
}


export const expectedValue = 5905;
