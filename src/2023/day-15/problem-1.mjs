function process(ins) {
  let result = 0;

  for (let i = 0; i < ins.length; i++) {
    const code = ins.charCodeAt(i);
    result += code;
    result *= 17;
    result %= 256;
  }

  return result;
}

export default function(input) {
  const data = input[0].split(',');

  let sum = 0;
  for (let ins of data) {
    const hash = process(ins);
    sum += hash;
  }

  return sum;
}

export const expectedValue = 1320;
