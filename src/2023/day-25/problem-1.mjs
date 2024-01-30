// thanks to this explanation: https://www.geeksforgeeks.org/introduction-and-implementation-of-kargers-algorithm-for-minimum-cut/

function cutEdges(edges, nodes) {
  nodes = Array.from(nodes);

  const parent = new Map(nodes.map(n => [n, n]));
  const rank = new Map(nodes.map(n => [n, 0]));

  function find(node) {
    // while the node is not equal to the parent
    if (node !== parent.get(node)) {
      parent.set(node, find(parent.get(node)));
    }

    return parent.get(node);
  }

  function union(a, b) {
    const pA = find(a);
    const pB = find(b);

    if (rank.get(pA) > rank.get(pB)) {
      parent.set(pB, pA);
    } else  if(rank.get(pA) < rank.get(pB)) {
      parent.set(pA, pB);
    } else {
      parent.set(pB, pA);
      rank.set(pA, rank.get(pA) + 1);
    }
  }

  let vertices = nodes.length;
  while (vertices > 2) {
    // contract... how?
    
    // 1. choose a random edge
    const edge = edges[Math.floor(Math.random() * edges.length)];
    const [a, b] = edge;

    const pa = find(a);
    const pb = find(b);

    if (pa === pb) continue;

    vertices--;
    union(a, b);
  }

  let count = 0;
  const edgesToCut = [];
  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i];
    let pA = find(a);
    let pB = find(b);
    if (pA !== pB) {
      // counting different components...
      count++;
      edgesToCut.push(`${a}-${b}`);
    }
  }

  return { count, edgesToCut, parent };
}

export default function(input) {
  let nodes = new Set();
  const edges = [];
  input.forEach(row => {
    const [origin, ...destinations] = row
      .replace(':', '')
      .split(' ');
    nodes.add(origin);

    for (let destination of destinations) {
      nodes.add(destination);
      edges.push([origin, destination]);
    }
  });
  nodes = Array.from(nodes);


  let count;
  let edgesToCut;
  let parent;
  while (count !== 3) {
    const result = cutEdges(edges, nodes);
    count = result.count;
    edgesToCut = result.edgesToCut;
    parent = result.parent;
  };

  const resultMap = Array
    .from(parent.values())
    .reduce((accum, node) => {
      if (accum.get(node) === undefined) accum.set(node, 0);
      accum.set(node, accum.get(node) + 1);

      return accum;
    }, new Map());

  console.log(resultMap);

  return Array.from(resultMap.values()).reduce((a, b) => a * b);
}

export const expectedValue = 54;
