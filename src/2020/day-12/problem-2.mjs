const verticalMapping = {
  N: 1,
  S: -1,
};

const horizonalMapping = {
  E: 1,
  W: -1,
};

function parseInput(row) {
  const regexTarget =  /^([A-Z]{1})(\d+)$/g;

  let match = regexTarget.exec(row);
  const [, instruction, amount] = match;
  return {
    instruction,
    amount: parseInt(amount, 10),
  };
};

function calculateResult({ E, N }) {
  return Math.abs(E) + Math.abs(N);
}

export default function(input) {
  const data = input
    .map(parseInput);

  const result = data.reduce((accum, { instruction, amount }) => {
    let result
    if (instruction === 'F') {
      result = { ...accum, E: accum.E + accum.wE * amount, N: accum.N + accum.wN * amount };
    } else if (verticalMapping[instruction]) {
      result = { ...accum, wN: accum.wN + amount * verticalMapping[instruction] };
    } else if (horizonalMapping[instruction]) {
      result = { ...accum, wE: accum.wE + amount * horizonalMapping[instruction] };
    } else {
      const mod = instruction === 'L' ? -1 : 1;
      const degrees = amount * 0.0174533 * mod;

      const wE = Math.round(accum.wE * Math.cos(degrees) + accum.wN * Math.sin(degrees));
      const wN = Math.round(- accum.wE * Math.sin(degrees) + accum.wN * Math.cos(degrees));

      result = { ...accum, wE, wN };
    }

    return result;
  }, { E: 0, N: 0, wE: 10, wN: 1 });


  return calculateResult(result);
}

export const expectedValue = 286;
