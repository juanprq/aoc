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

function getNewValue(v) {
  switch (v) {
    case '#':
      return '##';
    case 'O':
      return '[]';
    case '.':
      return '..';
    default:
      return '@.';
  }
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
      board.push(
        row
          .split('')
          .map(getNewValue)
          .join('')
          .split(''),
      );
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
    const value = board[r][c];

    if (value === '#') return false;
    if (value === '.') return true;
    if (value === '@' || '<>'.includes(movement)) {
      const { nr, nc } = getNext(r, c, movement);
      const canMove = move(nr, nc, movement);

      if (canMove) {
        board[nr][nc] = board[r][c];
        board[r][c] = '.';

        if (value === '@') {
          cr = nr;
          cc = nc;
        }

        return true;
      } else {
        return false;
      }
    }

    function boxCanMove(r, c, movement) {
      const value = board[r][c];
      let ca;
      let cb;
      if (value === '[') {
        ca = c;
        cb = c + 1;
      } else {
        ca = c - 1;
        cb = c;
      }

      const { nr: nra, nc: nca } = getNext(r, ca, movement);
      const { nr: nrb, nc: ncb } = getNext(r, cb, movement);

      if (board[nra][ncb] === '#' || board[nrb][ncb] === '#') return false;
      if (board[nra][nca] === '.' && board[nrb][ncb] === '.') return true;
      if (board[nra][nca] === '[') return boxCanMove(nra, nca, movement);

      if (board[nra][nca] === ']' && board[nrb][ncb] === '.') return boxCanMove(nra, nca, movement);
      if (board[nra][nca] === '.' && board[nrb][ncb] === '[') return boxCanMove(nrb, ncb, movement);
      if (board[nra][nca] === ']' && board[nrb][ncb] === '[') return boxCanMove(nra, nca, movement) && boxCanMove(nrb, ncb, movement);
    }

    if (value === '[') {
      const bcm = boxCanMove(r, c, movement);
      if (!bcm) return false;

      const { nr: nra, nc: nca } = getNext(r, c, movement);
      const { nr: nrb, nc: ncb } = getNext(r, c + 1, movement);

      const canMoveA = move(nra, nca, movement);
      const canMoveB = move(nrb, ncb, movement);

      if (canMoveA && canMoveB) {
        board[nra][nca] = board[r][c];
        board[nrb][ncb] = board[r][c + 1];

        board[r][c] = '.';
        board[r][c + 1] = '.';

        return true;
      } else {
        return false;
      }
    }

    if (value === ']') {
      const bcm = boxCanMove(r, c, movement);
      if (!bcm) return false;

      const { nr: nra, nc: nca } = getNext(r, c - 1, movement);
      const { nr: nrb, nc: ncb } = getNext(r, c, movement);

      const canMoveA = move(nra, nca, movement);
      const canMoveB = move(nrb, ncb, movement);

      if (canMoveA && canMoveB) {
        board[nra][nca] = board[r][c - 1];
        board[nrb][ncb] = board[r][c];

        board[r][c] = '.';
        board[r][c - 1] = '.';

        return true;
      } else {
        return false;
      }
    }
  }

  let i = 0;
  for (let movement of movements) {
    move(cr, cc, movement);
    i++;
  }

  let result = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === '[') {
        result += r * 100 + c;
      }
    }
  }

  return result;
}

export const expectedValue = 9021;
