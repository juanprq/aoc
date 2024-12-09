const MAPPING = {
  '^': '>',
  '>': 'v',
  'v': '<',
  '<': '^',
};

export default function(input) {
  const board = input.map(row => row.split(''));

  const rows = board.length;
  const cols = board[0].length;

  let ir;
  let ic;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (input[r][c] === '^') {
        ir = r;
        ic = c;
        break;
      }

      if (ir && ic) break;
    }
  }

  // I'm going to model this as a structure
  const position = { r: ir, c: ic, value: '^' };

  function getKey() {
    return `${position.r},${position.c}`;
  }

  function rotate() {
    position.value = MAPPING[position.value];
  }

  function move() {
    let nr = position.r;
    let nc = position.c;
    switch(position.value) {
      case '^':
        nr = nr - 1;
      break;
      case '>':
        nc = nc + 1;
      break;
      case 'v':
        nr = nr + 1;
      break;
      default:
        nc = nc - 1;
    }

    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) return true;
    if (board[nr][nc] === '#') {
      rotate();
      return false;
    }

    // default case is to move
    position.r = nr;
    position.c = nc;
    return false;
  }

  let hasFinished = false;
  const path = new Set();
  do {
    path.add(getKey())
    hasFinished = move();
  } while(!hasFinished);

  return path.size;
}

export const expectedValue = 41;
