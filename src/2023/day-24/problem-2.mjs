import * as math from 'mathjs';
// This solutin is based on this: https://aidiakapi.com/blog/2024-01-20-advent-of-code-2023-day-24/
// Thanks for the explanation

function getIntersectionTime(a, b) {
  const ac = a.slice(0, 3);
  const av = a.slice(3);
  const bc = b.slice(0, 3);
  const bv = b.slice(3);

  const plane = math.cross(ac, math.add(ac, av));

  const denominator = math.dot(bv, plane);
  if (denominator === 0) throw new Error('planes are paralell');

  const numerator = math.dot(math.multiply(bc, -1), plane);
  // if (numerator % denominator !== 0) throw new Error('Intersection time was not an integer');

  return math.round(numerator / denominator);
}

export default function(input) {
  const data = input
    .map(r => r
      .replace(' @ ', ', ')
      .split(', ')
      .map(v => math.bignumber(v))
    );

  // lets choose 3 stones
  const hailstones = data.slice(0, 3);
  const [reference, stoneA, stoneB] = hailstones;

  const stoneAr = math.subtract(stoneA, reference);
  const stoneBr = math.subtract(stoneB, reference);

  // now, what to do?
  // Lets try to read a blog or something that guide me through this
  // It won't be easy, but don't focus on the outcome, focus on the understanding
  // lets go
  const timeA = getIntersectionTime(stoneBr, stoneAr);
  const timeB = getIntersectionTime(stoneAr, stoneBr);

  // this follows the formula of x = v.t + c (having one dimension)
  const aPos = math.add(stoneA.slice(0, 3), math.multiply(stoneA.slice(3), timeA));
  const bPos = math.add(stoneB.slice(0, 3), math.multiply(stoneB.slice(3), timeB));

  const timeDelta = timeB - timeA;
  const positionDelta = math.subtract(bPos, aPos);

  const pv = math.divide(positionDelta, timeDelta); // to calculate the velocity, we calculate how much movement occurred per time unit between a and b.
  const pc = math.subtract(aPos, math.multiply(pv, timeA)); // from the collision with hailstoneA, subtract the already calculated velocity with the time it collides at point a, then I'll find the initial point
  return math.multiply(pc, [1, 1, 1]);
}

// real output: 999782576459892
export const expectedValue = 47;
