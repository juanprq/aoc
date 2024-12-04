const WORD = 'XMAS';

export default function(input) {
  const rows = input.length;
  const cols = input[0].length;
  let result = 0;

  function getStringValue(r, c) {
    if (r < 0 || r >= rows) return '';
    if (c < 0 || c >= cols) return '';

    return input[r][c];
  }

  function countWords(r, c) {
    const words = Array.from({ length: 8 }, () => []);
    for (let i = 0; i < WORD.length; i++) {
      words[0].push(getStringValue(r + i, c));
      words[1].push(getStringValue(r - i, c));
      words[2].push(getStringValue(r, c + i));
      words[3].push(getStringValue(r, c - i));
      words[4].push(getStringValue(r + i, c + i));
      words[5].push(getStringValue(r + i, c - i));
      words[6].push(getStringValue(r - i, c + i));
      words[7].push(getStringValue(r - i, c - i));
    }

    return words
      .map(wa => wa.join(''))
      .filter(w => w === WORD)
      .length;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const value = input[r][c];
      if (value === 'X') {
        result += countWords(r, c);
      }
    }
  }

  return result;
}

export const expectedValue = 18;
