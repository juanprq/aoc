const FOLDS = 5;

function process(map, groups) {
  const cache = new Map();

  function traverse(i = 0, gi = 0) {
    if (i >= map.length && gi < groups.length) {
      return 0;
    }
    if (gi === groups.length) {
      if (map.slice(i).includes('#')) return 0;
      return 1;
    }

    const key = `${i}#${gi}`;
    if (cache.has(key)) return cache.get(key);

    if (map[i] === '.') return traverse(i + 1, gi);

    if (map[i] === '#') {
      const gl = groups[gi];
      if (i + gl > map.length) return 0;

      const sub = map.slice(i, i + gl);

      if (sub.includes('.')) return 0;
      if (map[i + gl] === '#') return 0;
      return traverse(i + gl + 1, gi + 1);
    }


    let result = 0;
    result += traverse(i + 1, gi);

    const gl = groups[gi];
    if (
      i + gl <= map.length
      && !map.slice(i, i + gl).includes('.')
      && map[i + gl] !== '#'
    ) {
      result += traverse(i + gl + 1, gi + 1);
    }

    cache.set(key, result);

    return result;
  }
  return traverse();
}

export default function(input) {
  const data = [];
  for (let row of input) {
    let [map, groups] = row.split(' ');
    const fullMap = [];
    const fullGroups = [];
    for (let j = 0; j < FOLDS; j++) {
      fullMap.push(map);
      fullGroups.push(groups);
    }

    map = fullMap.join('?');
    groups = fullGroups.join(',').split(',').map(v => parseInt(v, 10));
    data.push({ map, groups });
  }

  let sum = 0;
  for (let { map, groups } of data) {
    const result = process(map, groups);
    sum += result;

    console.log(map, result);
  }

  return sum;
}

export const expectedValue = 525152;
