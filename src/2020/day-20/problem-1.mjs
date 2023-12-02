function getBorders(image) {
  const borders = [
    [], [], [], [],
  ];
  const size = image.length;

  for (let i = 0; i < size; i++) {
    borders[0].push(image[0][i]);
    borders[1].push(image[size - 1][i]);
    borders[2].push(image[i][0]);
    borders[3].push(image[i][size - 1]);
  }

  return borders;
}

function parseInput(row) {
  const [rawTitle, ...rawImage] = row;
  const image = rawImage.map(v => v.split(''));

  const id = parseInt(rawTitle.match(/\d+/)[0], 10);
  const borders = getBorders(image);

  return { id, image, borders, reference: new Set() };
}

export default function(rawInput) {
  console.log(rawInput);
  const ms = [[]];
  for (let row of rawInput) {
    if (row === '') {
      ms.push([]);
    } else {
      ms[ms.length - 1].push(row);
    }
  }
  const input = ms.map(parseInput);

  for (let i = 0; i < input.length; i++) {
    const matrixA = input[i];
    const { id: idA, borders: bordersA } = matrixA;

    for (let j = i + 1; j < input.length; j++) {
      const matrixB = input[j];
      const { id: idB, borders: bordersB } = matrixB;

      for (let k = 0; k < bordersA.length; k++) {
        for (let l = 0; l < bordersB.length; l++) {

          if (JSON.stringify(bordersA[k]) === JSON.stringify(bordersB[l]) || JSON.stringify(bordersA[k].reverse()) === JSON.stringify(bordersB[l])) {
            matrixA.reference.add(idB);
            matrixB.reference.add(idA);
          }
        }
      }

    }
  }

  const result = input
    .filter(m => m.reference.size === 2)
    .map(({ id }) => id)
    .reduce((a, b) => a * b);

  return result;
}

export const expectedValue = 20899048083289;
