function calculateHash(ins) {
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
  const boxes = Array.from({ length: 256 }, () => []);

  for (let ins of data) {
    const match = ins.match(/^(?<label>\w+)(?<op>=|-)(?<fl>\d?)$/);
    let { label, op, fl } = match.groups;

    const labelHash = calculateHash(label);
    const box = boxes[labelHash];

    if (op === '-') {
      boxes[labelHash] = box.filter((l) => l.label !== label);
    } else {
      fl = parseInt(fl, 10);
      const i = box.findIndex((l) => l.label === label);
      if (i !== -1) {
        box[i] = { label, fl };
      } else {
        box.push({ label, fl });
      }
    }
  }

  // calculate the result
  let sum = 0;
  for (let i = 0; i < boxes.length; i++) {
    for (let j = 0; j < boxes[i].length; j++) {
      sum += (i + 1) * (j + 1) * boxes[i][j].fl;
    }
  }

  return sum;
}

export const expectedValue = 145;
