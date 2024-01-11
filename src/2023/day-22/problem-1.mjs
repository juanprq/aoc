import { initializeMatrix } from '../../utils/index.mjs';

export default function(input) {
  const blocks = [];

  for (let i = 0; i < input.length; i++) {
    const [s, e] = input[i]
      .split('~')
      .map(g => g
        .split(',')
        .map(v => parseInt(v, 10))
      );

    const block = { i, points: [], z: s[2], face: [] };
    for (let x = s[0]; x <= e[0]; x++) {
      for (let y = s[1]; y <= e[1]; y++) {
        block.face.push([x, y]);
        for (let z = s[2]; z <= e[2]; z++) {
          block.points.push([x, y, z]);
        }
      }
    }
    blocks.push(block);
  }

  blocks.sort((a, b) => a.z - b.z);

  const rows = Math.max(...blocks.flatMap(b => b.face.map(p => p[0]))) + 1;
  const cols = Math.max(...blocks.flatMap(b => b.face.map(p => p[1]))) + 1;

  const stack = [];

  function collide(z, face) {
    const layer = stack[z];
    if (layer === undefined) return false; // layer is empty so it won't collide

    for (let [r, c] of face) {
      if (layer[r][c] !== null) return true; // it collides
    }

    return false; // if no point collides, then it won't collide
  }

  for (let block of blocks) {
    while (block.z > 1 && !collide(block.z - 1, block.face)) {
      block.z--; // fall
      for (let p of block.points) {
        p[2]--; // decrease each z
      }
    }

    const maxZ = block.points[block.points.length - 1][2];
    for (let z = block.z; z <= maxZ; z++) {
      if (stack[z] === undefined) {
        stack[z] = initializeMatrix([rows, cols], null);
      }
    }
    for (let p of block.points) {
      stack[p[2]][p[0]][p[1]] = block;
    }
  }

  // now, how I can determine what blocks to delete?
  // * If it doesn't have any block on top
  // * If the block on top, have another block underneed
  // I think I get it, but how I can determine this
  // For each block, go to the layer on top
  
  function countSupportingBlocks(block) {
    const nl = stack[block.z - 1];

    const blocks = new Set();
    for (let [r, c] of block.face) {
      if (nl[r][c]) blocks.add(nl[r][c]);
    }

    return blocks.size;
  }

  let result = 0;
  for (let block of blocks) {
    const tl = block.points[block.points.length - 1][2];
    const pl = stack[tl + 1];
    if (pl === undefined) {
      result++;
      continue;
    }

    const topBlocks = new Set();
    for (let [r, c] of block.face) {
      if (pl[r][c] !== null) topBlocks.add(pl[r][c]);
    }

    // lets think...
    let letsCount = true;
    for (let topBlock of topBlocks) {
      const count = countSupportingBlocks(topBlock);
      if (count === 1) {
        letsCount = false;
        break;
      }
    }

    if (letsCount) result++;
  }

  return result;
}

export const expectedValue = 5;
