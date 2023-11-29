function isSmallCave(node) {
  return node === node.toLowerCase();
}

function checkVisited(visited, node) {
  if (!visited[node]) return false;
  if (visited[node] && 'start' === node) return true;

  // if all count is 1, the I can continue
  if (Object.values(visited).every(a => a === 1)) return false;
  return true;
}

export default function(input) {
  let data = input
    .map(row => row.split('-'));

  const graph = data.reduce((accum, [sNode, eNode]) => {
    if (!accum[sNode]) accum[sNode] = [];
    accum[sNode].push(eNode);

    if (!accum[eNode]) accum[eNode] = [];
    accum[eNode].push(sNode);

    return accum;
  }, {});

  let paths = 0;
  const navigate = (node = 'start', visited = {}) => {
    if (checkVisited(visited, node)) return;
    if (node === 'end') {
      paths++;
      return;
    }

    const newVisited = { ...visited };
    if (isSmallCave(node)) {
      if (!newVisited[node]) {
        newVisited[node] = 1;
      } else {
        newVisited[node]++;
      }
    };

    const adjacentNodes = graph[node];
    for (let i = 0; i < adjacentNodes.length; i++) {
      navigate(adjacentNodes[i], newVisited);
    }
  }

  navigate();

  return paths;
}

export const expectedValue = 36;
