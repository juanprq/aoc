function getNext(r, c, movement) {
  let nr = r;
  let nc = c;
  switch (movement) {
    case '^':
      nr--;
      break;
    case '>':
      nc++;
      break;
    case 'v':
      nr++;
      break;
    case '<':
      nc--;
      break;
  }

  return { nr, nc };
}

export default function(input) {
  const board = [];
  let movements = '';
  let next = false;
  for (let row of input) {
    if (next) {
      movements += row;
    } else if (row === '') {
      next = true;
    } else {
      board.push(row.split(''));
    }
  }

  const rows = board.length;
  const cols = board[0].length;

  let cr;
  let cc;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === '@') {
        cr = r;
        cc = c;
      }
    }
  }

  function move(r, c, movement) {
    const v = board[r][c];
    if (v === '#') return false;
    if (v === '.') return true;

    const { nr, nc } = getNext(r, c, movement);
    const canMove = move(nr, nc, movement);

    if (canMove) {
      board[nr][nc] = board[r][c];
      board[r][c] = '.';
      cr = nr;
      cc = nc;
      return true;
    }

    return false;
  }

  for (let movement of movements) {
    move(cr, cc, movement);
  }

  let result = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 'O') {
        result += r * 100 + c;
      }
    }
  }

  return result;
}

export const expectedValue = 10092;
