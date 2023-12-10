import { initializeMatrix, print2DMatrix } from "../../utils/index.mjs";

const DIRECTIONS = {
  U: ([r, c]) => [r - 1, c],
  R: ([r, c]) => [r, c + 1],
  D: ([r, c]) => [r + 1, c],
  L: ([r, c]) => [r, c - 1],
};

const ID = { U: 'D', R: 'L', D: 'U', L: 'R' };

const SYMBOLS = {
  '|': ['U', 'D'],
  '-': ['L', 'R'],
  'L': ['U', 'R'],
  'J': ['U', 'L'],
  '7': ['L', 'D'],
  'F': ['R', 'D'],
};

const REPLACE = {
  '|': '│',
  '-': '─',
  L: '└',
  J: '┘',
  7: '┐',
  F: '┌',
};

function getKey([r, c]) {
  return `${r},${c}`;
}

function fillOutside(pos, rows, cols, matrix, visited) {
  const stack = [pos];

  while (stack.length > 0) {
    const [r, c] = stack.pop();

    if (r < 0 || r >= rows) continue;
    if (c < 0 || c >= cols) continue;
    if (visited.has(getKey([r, c]))) continue;

    visited.add(getKey([r, c]));
    matrix[r][c] = 'O';

    for (let o of Object.values(DIRECTIONS)) {
      stack.push(o([r, c]));
    }
  }
}

export default function(maze) {
  const rows = maze.length;
  const cols = maze[0].length;

  let start;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (maze[r][c] === 'S') {
        start = [r, c];
        break;
      }
    }
  }

  const [sr, sc] = start;
  const queue = [];
  for (let [d, o] of Object.entries(DIRECTIONS)) {
    const id = ID[d];
    const [nr, nc] = o(start);

    if (nr < 0 || nr >= rows) continue;
    if (nc < 0 || nc >= cols) continue;

    const sym = maze[nr][nc];
    if (SYMBOLS[sym] === undefined) continue;
    if (SYMBOLS[sym].includes(id)) {
      queue.push([nr, nc]);
    }
  }

  // now, lets do a bfs in here...
  const visited = new Set();
  visited.add(getKey(start));

  while (queue.length > 0) {
    const l = queue.length;

    for (let i = 0; i < l; i++) {
      const p = queue.shift();
      visited.add(getKey(p));

      const sym = maze[p[0]][p[1]];
      const directions = SYMBOLS[sym];

      for (let d of directions) {
        const np = DIRECTIONS[d](p);

        const [nr, nc] = np;
        if (nr < 0 || nr >= rows) throw new Error('impossimbobol!');
        if (nc < 0 || nc >= cols) throw new Error('impoossimbobol!');
        if (SYMBOLS[maze[nr][nc]] === undefined) continue;
        if (visited.has(getKey(np))) continue;
        queue.push(np);
      }
    }
  }

  // other experiment...
  const daux = initializeMatrix([rows * 2, cols * 2], '.');
  const dvisited = new Set();
  const aux = initializeMatrix([rows, cols], '.');
  for (let p of visited) {
    const [r, c] = p.split(',').map(v => parseInt(v, 10));
    const sym = maze[r][c];
    const directions = SYMBOLS[sym];
    dvisited.add(getKey([r * 2, c * 2]));

    if (directions) {
      for (let d of directions) {
        const [nr, nc] = DIRECTIONS[d]([r * 2, c * 2]);
        daux[nr][nc] = '*';
        dvisited.add(getKey([nr, nc]));
      }
    }

    if (REPLACE[maze[r][c]]) {
      daux[r * 2][c * 2] = REPLACE[maze[r][c]];
      aux[r][c] = REPLACE[maze[r][c]];
    } else {
      daux[r * 2][c * 2] = maze[r][c];
      aux[r][c] = maze[r][c];
    }
  }

  const drows = daux.length;
  const dcols = daux[0].length;

  for (let r = 0; r < rows; r++) {
    fillOutside([r, 0], rows, cols, aux, visited);
    fillOutside([r, cols - 1], rows, cols, aux, visited);
  }
  for (let c = 0; c < cols; c++) {
    fillOutside([0, c], rows, cols, aux, visited);
    fillOutside([rows - 1, c], rows, cols, aux, visited);
  }

  for (let r = 0; r < drows; r++) {
    fillOutside([r, 0], drows, dcols, daux, dvisited);
    fillOutside([r, dcols - 1], drows, dcols, daux, dvisited);
  }
  for (let c = 0; c < dcols; c++) {
    fillOutside([0, c], drows, dcols, daux, dvisited);
    fillOutside([drows - 1, c], drows, dcols, daux, dvisited);
  }

  print2DMatrix(aux);
  console.log('-'.repeat(30));
  print2DMatrix(daux);


  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (aux[r][c] === '.') {
        const ts = daux[r * 2][c * 2];
        if (ts === '.') count++;
      }
    }
  }

  return count;

  // experimenting...
  // const aux = initializeMatrix([rows, cols], '.');
  // const path = [];
  // for (let p of visited) {
  //   const [r, c] = p.split(',').map(v => parseInt(v, 10));
  //   path.push([r, c]);
  //   if (REPLACE[maze[r][c]]) {
  //     aux[r][c] = REPLACE[maze[r][c]];
  //   } else {
  //     aux[r][c] = maze[r][c];
  //   }
  //   // aux[r][c] = '*';
  // }
  // console.log(path);

  // function fillOutside([r, c]) {
  //   if (r < 0 || r >= rows) return;
  //   if (c < 0 || c >= cols) return;
  //   if (visited.has(getKey([r, c]))) return;

  //   visited.add(getKey([r, c]));
  //   aux[r][c] = 'O';
  //   // I will probably need to check the whole 9 x 9, not sure yet...
  //   for (let i = Math.max(0, r - 1); i <= Math.min(rows - 1, r + 1); i++) {
  //     for (let j = Math.max(0, c - 1); j <= Math.min(cols - 1, c + 1); j++) {
  //       fillOutside([i, j]);
  //     }
  //   }
  //   // for (let o of Object.values(DIRECTIONS)) {
  //   //   const np = o([r, c]);
  //   //   fillOutside(np);
  //   // }
  // }

  // for (let r = 0; r < rows; r++) {
  //   fillOutside([r, 0]);
  //   fillOutside([r, cols - 1]);
  // }
  // for (let c = 0; c < cols; c++) {
  //   fillOutside([0, c]);
  //   fillOutside([rows - 1, c]);
  // }

  // print2DMatrix(aux);

  // let count = 0;
  // for (let r = 0; r < rows; r++) {
  //   for (let c = 0; c < cols; c++) {
  //     if (aux[r][c] === '.') count++;
  //   }
  // }

  // return count;
}


// 733 too high, obviously...
// 711 too high, I'm missing the squeeze between tubes...
export const expectedValue = 8;
