const TIMES = 25;

export default function(input) {
  let stones = input[0].split(' ');

  function blink() {
    const newStones = [];

    for (let s of stones) {
      if (s === '0') {
        newStones.push('1');
      } else if (s.length % 2 === 0) {
        newStones.push(parseInt(s.slice(0, s.length / 2), 10).toString());
        newStones.push(parseInt(s.slice(s.length / 2), 10).toString());
      } else {
        newStones.push((parseInt(s, 10) * 2024).toString());
      }
    }

    return newStones;
  }

  for (let i = 0; i < TIMES; i++) {
    stones = blink();
  }

  return stones.length;
}

export const expectedValue = 55312;
