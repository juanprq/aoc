import { Queue } from '@datastructures-js/queue';

let low = 0;
let high = 0;

class Broadcaster {
  constructor(outputs) {
    this.name = 'broadcaster';
    this.outputs = outputs;
  }

  inputSignal() {
    low += this.outputs.length;
    return this.outputs
      .map(name => ({ name, value: false }));
  }
}

class FlipFlop {
  state = false;

  constructor(name, outputs) {
    this.name = name;
    this.outputs = outputs;
  }

  inputSignal(module, value) {
    if (value) {
      return [];
    }

    this.state = !this.state;
    if (this.state) {
      high += this.outputs.length;
    } else {
      low += this.outputs.length;
    }
    return this.outputs
      .map(name => ({ name, value: this.state }));
  }
}

class Conjunction {
  inputModules = new Map();

  constructor(name, outputs) {
    this.name = name;
    this.outputs = outputs;
  }

  get output() {
    return !Array
      .from(this.inputModules.values())
      .every(v => v);
  }

  inputSignal(module, value) {
    this.inputModules.set(module, value);

    if (this.output) {
      high += this.outputs.length;
    } else {
      low += this.outputs.length;
    }
    return this.outputs
      .map(name => ({ name, value: this.output }));
  }
}

export default function(input) {
  const modules = new Map();

  for (let row of input) {
    const [first, second] = row.split(' -> ');

    const outputs = second.split(', ');
    if (first === 'broadcaster') {
      const m = new Broadcaster(outputs);
      modules.set('broadcaster', m);
      continue;
    }

    const input = first.slice(1);
    if (first[0] === '%') {
      const module = new FlipFlop(input, outputs);
      modules.set(input, module);
    } else if (first[0] === '&') {
      const module = new Conjunction(input, outputs);
      modules.set(input, module);
    } else {
      throw new Error('bad data!');
    }
  }

  // setup the conjunction modules
  for (let [input, m] of modules) {
    for (let out of m.outputs) {
      const tm = modules.get(out);

      if (tm && tm.constructor === Conjunction) {
        tm.inputModules.set(m.name, false);
      }
    }
  }

  const queue = new Queue();
  function pushButton() {
    low++;
    const bModule = modules.get('broadcaster');
    const pulses = bModule.inputSignal();

    pulses.forEach(p => queue.enqueue({ pulse: p, module: bModule.name }));

    while (queue.size() > 0) {
      const { pulse, module } = queue.dequeue();

      const tm = modules.get(pulse.name);
      if (!tm) continue;

      const ps = tm.inputSignal(module, pulse.value);
      ps.forEach(np => queue.enqueue({ pulse: np, module: tm.name }));
    }
  }

  const ITER = 1e3;
  for (let i = 0; i < ITER; i++) {
    pushButton();
  }

  return low * high;
}

export const expectedValue = 11687500;
