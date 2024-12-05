export default function(input) {
  const rulesMap = new Map();
  const pages = [];
  let toPages = false;

  for (let row of input) {
    if (row === '') {
      toPages = true;
      continue;
    }
    if (toPages) {
      pages.push(row.split(',').map(value => parseInt(value, 10)));
      continue;
    }

    const [a, b] = row.split('|').map(value => parseInt(value, 10));
    if (!rulesMap.has(a)) {
      rulesMap.set(a, new Set());
    }

    rulesMap.get(a).add(b);
  }

  function compareFn(a, b) {
    if (rulesMap.has(a) && rulesMap.get(a).has(b)) {
      return -1;
    }

    return 1;
  }

  let result = 0;

  for (let page of pages) {
    let valid = true;

    for (let i = 0; i < page.length - 1; i++) {
      const a = page[i];

      for (let j = i + 1; j < page.length; j++) {
        const b = page[j];

        if (!rulesMap.has(a)) {
          valid = false;
          break;
        }
        if (!rulesMap.get(a).has(b)) {
          valid = false;
          break;
        }
      }

      if (!valid) break;
    }

    if (!valid) {
      page.sort(compareFn);
      result += page[page.length >> 1];
    }
  }

  return result;
}

export const expectedValue = 123;
