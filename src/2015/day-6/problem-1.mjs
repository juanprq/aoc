import { initializeMatrix } from '../../utils/index.mjs';
const N = 1000;

export default function(input) {
  const lights = initializeMatrix([N, N], 0);

  function countLights() {
    let result = 0;
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        if (lights[r][c] === 1) result++;
      }
    }

    return result;
  }

  for (let instruction of input) {
    let op;
    let start;
    let end;

    const sp = instruction.split(' ');
    if (instruction[1] === 'o') {
      op = 'toggle';
      start = sp[1].split(',').map(v => parseInt(v, 10));
      end = sp[3].split(',').map(v => parseInt(v, 10));

    } else if (instruction[1] === 'u') {
      if (instruction[6] === 'f') {
        op = 'off';
      } else {
        op = 'on';
      }

      start = sp[2].split(',').map(v => parseInt(v, 10));
      end = sp[4].split(',').map(v => parseInt(v, 10));
    } else {
      throw new Error('impossimbobol!');
    }

    for (let r = start[0]; r <= end[0]; r++) {
      for (let c = start[1]; c <= end[1]; c++) {
        if (op === 'off') {
          lights[r][c] = 0;
        } else if (op === 'on') {
          lights[r][c] = 1;
        } else if (op === 'toggle') {
          lights[r][c] = lights[r][c] === 1 ? 0 : 1;
        } else {
          throw new Error('impossimbobol!');
        }
      }
    }
  }

  return countLights();
}

export const expectedValue = 1e6 - 1e3 - 4;
