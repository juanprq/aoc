function parseMem(row) {
  const regex = /^mem\[(\d+)\]\s=\s(\d+)$/;
  const match = regex.exec(row);

  const [, idx, value] = match;

  return {
    idx: parseInt(idx, 10),
    value: parseInt(value, 10),
  };
}

function getAdresses(idx, mask) {
  const address = idx
    .toString(2)
    .padStart(36, '0')
    .split('')
    .map((bit, idx) => {
      if (mask[idx] !== '0') {
        return mask[idx];
      }

      return bit;
    });

  const result = [];
  const buildAddresses = ([head, ...rest], accum = []) => {
    if (!head) {
      result.push(accum);
      return;
    }
    if (head === '1' || head === '0') {
      buildAddresses(rest, [...accum, head]);
    } else {
      buildAddresses(rest, [...accum, '0']);
      buildAddresses(rest, [...accum, '1']);
    }
  }
  buildAddresses(address);

  return result
    .map(row => {
      return parseInt(row.join(''), 2);
    });
}

export default function(input) {
  const currentMemory = {};
  let currentMask;
  for (let i = 0; i < input.length; i++) {
    const row = input[i];
    if (row.startsWith('mask')) {
      const [,, maskStr] = row.split(' ');
      currentMask = maskStr.split('');
    } else {
      const { idx, value } = parseMem(row);
      const addresses = getAdresses(idx, currentMask);

      addresses.forEach(newIdx => {
        currentMemory[newIdx] = value;
      });
    }
  }

  const result = Object.values(currentMemory).reduce((a, b) => a + b, 0);
  return result;
}

export const expectedValue = 208;
