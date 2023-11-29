import { initializeMatrix } from '../../utils/index.mjs';

function checkWinner(tracker) {
  let rows = tracker.map(row => row.every(a => a));
  if (rows.some(a => a)) return true;

  // check cols
  for (let i = 0; i < tracker.length; i++) {
    let winner = true;
    for (let j = 0; j < tracker[0].length; j++) {
      winner = winner && tracker[j][i];
    }

    if (winner) return true;
  }

  return false;
}

export default function(input) {
  // load the initial data
  const draftNumbers = input
    .shift()
    .split(',')
    .map(value => parseInt(value, 10));

  let boards = [];
  let currentBoard = [];
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== '') {
      const row = input[i]
        .trim()
        .split(/\s+/)
        .map(value => parseInt(value, 10));


      currentBoard.push(row);

      if (currentBoard.length === 5) {
        boards.push(currentBoard);
        currentBoard = [];
      }
    }
  }

  const trackers = [];
  boards.forEach(() => {
    trackers.push(initializeMatrix([5, 5], false));
  });

  let lastDraft;
  let looserIndex;
  const excludedBoards = {};

  for (let i = 0; i < draftNumbers.length; i++) {
    const draftNumber = draftNumbers[i];

    for (let j = 0; j < boards.length; j++) {
      if (excludedBoards[j]) continue;

      const currentBoard = boards[j];

      for (let c = 0; c < currentBoard.length; c++) {
        for (let r = 0; r < currentBoard[0].length; r++) {
          if (currentBoard[c][r] === draftNumber) {
            trackers[j][c][r] = true;
          }
        }
      }

      // check if current board is winner
      const winner = checkWinner(trackers[j]);

      if (winner) {
        excludedBoards[j] = true;
      }

      if (Object.keys(excludedBoards).length === boards.length) {
        lastDraft = draftNumber;
        looserIndex = j;
        break;
      }
    }
  }

  const looserTracker = trackers[looserIndex];
  const looserBoard = boards[looserIndex];

  let sum = 0;
  for (let i = 0; i < looserBoard.length; i++) {
    for (let j = 0; j < looserBoard[0].length; j++) {
      if (looserBoard[i][j] === lastDraft) continue;
      if (!looserTracker[i][j]) {
        sum += looserBoard[i][j];
      }
    }
  }

  return lastDraft * (sum);
}

export const expectedValue = 1924;
