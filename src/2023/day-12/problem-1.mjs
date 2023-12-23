function process(map, groups) {

  // I need to implement a recursive algorithm that counts the positibilities
  // first I will need to think in base cases
  // I'll need to try to understand the stretagies to identify things in here...
  function traverse(i = 0, gi = 0) {
    if (i >= map.length && gi < groups.length) {
      return 0; // there are remaining groups that were not consumed
    }
    if (gi === groups.length) {
      if (map.slice(i).includes('#')) return 0 // all groups are consumed, but there are more damaged springs that were left outside of the groups
      return 1;
    }

    // if its a dot I can continue with the next iteration.
    // This is a simple case
    if (map[i] === '.') return traverse(i + 1, gi);

    // if the current char is #, I need to include it in the current group
    if (map[i] === '#') {
      const gl = groups[gi];
      if (i + gl > map.length) return 0; // the group cannot be completed because there aren't enough elemnts

      const sub = map.slice(i, i + gl);

      if (sub.includes('.')) return 0; // this is an impossible, because in the group cannot have be a "." element inside
      if (map[i + gl] === '#') return 0; // this is also an impossible because the group needs to be separated
      return traverse(i + gl + 1, gi + 1); // consume the group and continue with the next sub-problem
    }


    // if the element is a "?", it can be a ".", or it can be a "#" lets treat it as both
    let result = 0;

    result += traverse(i + 1, gi); // treated as a dot

    // how I can treat it as a "#"?
    const gl = groups[gi];
    if (
      i + gl <= map.length // it can be last element
      && !map.slice(i, i + gl).includes('.') // the group cannot contain a ".'
      && map[i + gl] !== '#' // next element cannot be a "#"
    ) {
      result += traverse(i + gl + 1, gi + 1);
    }

    return result;
  }
  return traverse();
}

export default function(input) {
  let sum = 0;

  for (let row of input) {
    let [map, groups] = row.split(' ');
    groups = groups.split(',').map(v => parseInt(v, 10));

    const result = process(map, groups);
    sum += result;

    console.log(map, result);
  }

  return sum;
}

export const expectedValue = 21;
