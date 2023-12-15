function findOrigin(m) {
  const origins = [];
  for (let i = 0; i < m.length - 1; i++) {
    const c1 = m[i];
    const c2 = m[i + 1];
    if (c1 === c2) {
      origins.push([i, i + 1]);
    }
  }

  for (let o of origins) {
    let [l, r] = o;

    while (l >= 0 && r < m.length && m[l] === m[r]) {
      l--;
      r++;
    }

    if (l === -1 || r === m.length) {
      // this is valid
      return o[1];
    }
  }

  return null;
}

function process(m) {
  const rows = m;
  const cols = [];
  for (let c = 0; c < m[0].length; c++) {
    let col = '';
    for (let r = 0; r < m.length; r++) {
      col += m[r][c];
    }

    cols.push(col);
  }

  const co = findOrigin(cols);
  if (co !== null) return co;
  const ro = findOrigin(rows);
  if (ro === null) throw new Error('imposimbobol!');

  return ro * 100;
}

export default function(input) {
  const data = [[]];

  for (let row of input) {
    if (row === '') {
      data.push([]);
    } else {
      data[data.length - 1].push(row);
    }
  }

  let sum = 0;
  for (let m of data) {
    sum += process(m);
  }

  return sum;
}

export const expectedValue = 405;
