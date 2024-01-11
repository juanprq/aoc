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

  function fall(block) {
    const oz = block.z;
    while (block.z > 1 && !collide(block.z - 1, block.face)) {
      block.z--; // fall
      for (let p of block.points) {
        p[2]--; // decrease each z
      }
    }

    return oz !== block.z; // if different indicates that it falled
  }

  function fill(block) {
    for (let [x, y, z] of block.points) {
      stack[z][x][y] = block;
    }
  }

  function countSupportingBlocks(block) {
    const nl = stack[block.z - 1];

    const blocks = new Set();
    for (let [r, c] of block.face) {
      if (nl[r][c]) blocks.add(nl[r][c]);
    }

    return blocks.size;
  }

  for (let block of blocks) {
    fall(block);

    const maxZ = block.points[block.points.length - 1][2];
    for (let z = block.z; z <= maxZ; z++) {
      if (stack[z] === undefined) {
        stack[z] = initializeMatrix([rows, cols], null);
      }
    }
    fill(block);
  }

  const toDesintegrate = [];
  for (let block of blocks) {
    const tl = block.points[block.points.length - 1][2];
    const pl = stack[tl + 1];
    if (pl === undefined) {
      continue;
    }

    const topBlocks = new Set();
    for (let [r, c] of block.face) {
      if (pl[r][c] !== null) topBlocks.add(pl[r][c]);
    }

    // lets think...
    for (let topBlock of topBlocks) {
      const count = countSupportingBlocks(topBlock);
      if (count === 1) {
        toDesintegrate.push(block);
        break;
      }
    }
  }

  function calculate(block, fallingBlocks) {
    const pz = block.points[block.points.length - 1][2] + 1;
    const pl = stack[pz];
    if (!pl) return; // if there isn't a previous layer

    const topBlocks = new Set();
    for (let [r, c] of block.face) {
      if (pl[r][c] !== null) topBlocks.add(pl[r][c]);
    }

    for (let topBlock of topBlocks) {
      const layer = stack[topBlock.z - 1];

      const supportingBlocks = new Set();
      for (let [r, c] of topBlock.face) {
        if (layer[r][c] !== null) supportingBlocks.add(layer[r][c]);
      }

      // now if all supporting blocks are included in the falling blocks, then add current block
      if (fallingBlocks.has(topBlock)) continue;
      if (Array.from(supportingBlocks).every(b => fallingBlocks.has(b))) {
        fallingBlocks.add(topBlock);
        calculate(topBlock, fallingBlocks);
      }
    }
  }

  let result = 0;
  for (let block of toDesintegrate) {
    const fallingBlocks = new Set();
    fallingBlocks.add(block);

    calculate(block, fallingBlocks);

    result += fallingBlocks.size - 1;
  }

  return result;
}

export const expectedValue = 7;
