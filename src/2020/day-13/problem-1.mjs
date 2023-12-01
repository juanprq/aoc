export default function(input) {
  const [depart, inputIds] = input;

  const result = inputIds
    .split(',')
    .filter(v => v !== 'x')
    .map(v => parseInt(v, 10))
    .map(v => {
      return {
        id: v,
        value: Math.ceil(depart / v) * v,
      };
    })
    .reduce((accum, v) => {
      return v.value < accum.value ? v : accum;
    });

  return (result.value - depart) * result.id;
}

export const expectedValue = 295;
