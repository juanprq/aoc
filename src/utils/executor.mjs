import path from 'node:path';
import flags from 'flags';
import chalk from 'chalk';
import childProcess from 'node:child_process';
import { loadInput } from './index.mjs';

flags.defineNumber('y');
flags.defineNumber('d');
flags.defineNumber('p');
flags.defineBoolean('t', false);

flags.parse();

const year = flags.get('y');
const day = flags.get('d');
const problem = flags.get('p');
const testMode = flags.get('t');

if (day === undefined) {
  throw new Error('day flag is not present, please add a --d x to indicate the day to execute');
}

if (year === undefined) {
  throw new Error('year flag is not present, please add a --y x to indicate the year to execute');
}

if (problem === undefined) {
  throw new Error('problem flag is not present, please add a --p x to indicate the problem to execute');
}

const dirPath = path.join(
  process.cwd(),
  'src',
  year.toString(),
  `day-${day}`,
);

const filePath = path.join(
  dirPath,
  `problem-${problem}.mjs`
);

import(filePath)
  .then(module => {
    console.log(chalk.bgGreen(`🎄🎄---- DAY ${day} ----🎄🎄`));
    console.log(chalk.bgRed(`------ PROBLEM ${problem} ------`));

    const inputText = loadInput(dirPath, testMode ? 'test.txt' : 'input.txt');
    const result = module.default(inputText);
    console.log(chalk.bgGreen('🎅----- RESULT ------🎅'));

    if (testMode) {
      if (result === module.expectedValue) {
        console.log(chalk.green('Bingo! we hit the mother lode!'));
      } else {
        console.log(chalk.bgRedBright('Try again! bad result...'));
      }
    }

    console.log(result)
    console.log(chalk.green('result copied to clipboard'));

    childProcess.exec(`echo "${result}" | pbcopy`);
  });
