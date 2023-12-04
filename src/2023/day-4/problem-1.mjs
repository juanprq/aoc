export default function(input) {
  let points = 0;

  for (let card of input) {
    const match = card.match(/Card\s+\d+:\s+(?<rest>.*)/);
    const { rest } = match.groups;
    let [winning, nums] = rest.split(' | ');
    winning = winning.split(/\s+/).map(v => parseInt(v, 10));
    nums = nums.split(/\s+/).map(v => parseInt(v, 10));
    
    const winningSet = new Set();
    for (let winningNum of winning) {
      winningSet.add(winningNum);
    }

    let count = 0;
    for (let num of nums) {
      if (winningSet.has(num)) count++;
    }

    if (count > 0) {
      points += Math.pow(2, count - 1);
    }
  }

  return points;
}

export const expectedValue = 13;
