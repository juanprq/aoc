import crypto from 'node:crypto';

export default function(input) {
  const key = input[0];

  let hash;
  let i = 0;
  do {
    i++;
    hash = crypto.createHash('md5').update(key + i).digest('hex');
  } while (hash.slice(0, 5) !== '00000');

  return i;
}

export const expectedValue = 609043;
