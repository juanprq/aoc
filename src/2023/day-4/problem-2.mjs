function countMatches(winning, nums) {
  const winningSet = new Set();
  for (let winningNum of winning) {
    winningSet.add(winningNum);
  }

  let count = 0;
  for (let num of nums) {
    if (winningSet.has(num)) count++;
  }

  return count;
}

export default function(input) {
  const index = new Map();

  const queue = [];
  for (let card of input) {
    const match = card.match(/Card\s+(?<id>\d+):\s+(?<rest>.*)/);
    const { rest, id } = match.groups;
    let [winning, nums] = rest.split(' | ');
    winning = winning.split(/\s+/).map(v => parseInt(v, 10));
    nums = nums.split(/\s+/).map(v => parseInt(v, 10));
    
    const pId = parseInt(id, 10);
    index.set(pId, countMatches(winning, nums));
    queue.push(pId);
  }

  function calculate(id) {
    const cc = index.get(id);

    let result = 1;
    for (let i = id + 1; i <= id + cc; i++) {
      result += calculate(i);
    }
    return result;
  }

  let count = 0;
  for (let id of queue) {
    count += calculate(id);
  }

  return count;
}

export const expectedValue = 30;
