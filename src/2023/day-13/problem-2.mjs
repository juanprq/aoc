function findOrigin(m, oresult) {
  const origins = [];
  for (let i = 0; i < m.length - 1; i++) {
    if (oresult && oresult.o[0] === i) continue;
    const c1 = m[i];
    const c2 = m[i + 1];
    if (c1.join('') === c2.join('')) {
      origins.push([i, i + 1]);
    }
  }

  for (let o of origins) {
    let [l, r] = o;

    while (l >= 0 && r < m.length && m[l].join('') === m[r].join('')) {
      l--;
      r++;
    }

    if (l === -1 || r === m.length) {
      // this is valid
      return o;
    }
  }

  return null;
}

function process(m, oresult) {
  const rows = m;
  const cols = [];
  for (let c = 0; c < m[0].length; c++) {
    const col = [];
    for (let r = 0; r < m.length; r++) {
      col.push(m[r][c]);
    }

    cols.push(col);
  }

  const co = findOrigin(cols, oresult.d === 'v' ? oresult : null);
  if (co !== null) return { d: 'v', o: co };

  const ro = findOrigin(rows, oresult.d === 'h' ? oresult : null);
  if (ro !== null) return { d: 'h', o: ro };

  return null;
}

export default function(input) {
  const data = [[]];

  for (let row of input) {
    if (row === '') {
      data.push([]);
    } else {
      data[data.length - 1].push(row.split(''));
    }
  }

  let sum = 0;
  for (let m of data) {
    const oresult = process(m, {});

    let stop = false;

    for (let r = 0; r < m.length; r++) {
      for (let c = 0; c < m[0].length; c++) {
        const char = m[r][c];
        const nc = char === '.' ? '#' : '.';
        m[r][c] = nc;
        const result = process(m, oresult);
        m[r][c] = char;

        if (result === null) continue;

        const { d, o } = result;
        if (d === 'h') {
          sum += o[1] * 100;
        } else {
          sum += o[1];
        }
        stop = true;
        break;
      }
      if (stop) break;
    }
  }

  return sum;
}

export const expectedValue = 400;
