import { Queue } from '@datastructures-js/queue';
import { mcm } from '../../utils/index.mjs';

const TARGET_MODULE = 'rx';

class Broadcaster {
  constructor(outputs) {
    this.name = 'broadcaster';
    this.outputs = outputs;
  }

  inputSignal() {
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

  // lets find the last module
  let lastModule;
  for (let m of modules.values()) {
    if (m.outputs.includes(TARGET_MODULE)) {
      lastModule = m.name;
      break;
    }
  }
  const ims = Array.from(modules.get(lastModule).inputModules.keys());
  const diffs = new Map(ims.map(v => [v, new Set()]));

  const queue = new Queue();
  function pushButton(i) {
    const bModule = modules.get('broadcaster');
    const pulses = bModule.inputSignal();

    pulses.forEach(p => queue.enqueue({ pulse: p, module: bModule.name }));

    while (queue.size() > 0) {
      const { pulse, module } = queue.dequeue();

      for (let im of ims) {
        if (modules.get(lastModule).inputModules.get(im)) {
          diffs.get(im).add(i);
        }
      }

      const tm = modules.get(pulse.name);
      if (!tm) continue;

      const ps = tm.inputSignal(module, pulse.value);
      ps.forEach(np => queue.enqueue({ pulse: np, module: tm.name }));
    }
  }

  let i = 0;
  while (true) {
    i++;
    pushButton(i);

    if (Array.from(diffs.values()).map(s => s.size).every(s => s >= 10)) break;
  }

  let result = 1;
  for (let set of diffs.values()) {
    const [first, second] = set;
    result = mcm(result, second - first);
  }

  return result;
}

// st = 251456 - 247527 = 3929
// tn = 309040 - 305177 = 3863
// hh = 105532 - 101763 = 3769
// dt = 106054 - 101975 = 4079

export const expectedValue = 11687500;
