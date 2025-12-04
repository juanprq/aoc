import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import * as flags from 'flg';

const cookie = process.env.SESSION_COOKIE;

flags.defineInteger('y');
flags.defineInteger('d');

flags.parse();

const year = flags.get('y');
const day = flags.get('d');

if (day === undefined) {
  throw new Error('day flag is not present, please add a --d x to indicate the day to execute');
}

if (year === undefined) {
  throw new Error('year flag is not present, please add a --y x to indicate the year to execute');
}

const srcPath = path.join(process.cwd(), 'src');
const yearPath = path.join(srcPath, year.toString());
const dayPath = path.join(yearPath, `day-${day}`);
const problem1sPath = path.join(dayPath, 'problem-1.mjs');
const problem2sPath = path.join(dayPath, 'problem-2.mjs');
const testPath = path.join(dayPath, 'test.txt');
const inputPath = path.join(dayPath, 'input.txt');

if (fs.existsSync(problem1sPath)) {
  console.log(chalk.red('the schema could not be generated because the file already exists'));
  process.exit();
}

console.log(chalk.green('generating files...'));

for (let path of [yearPath, dayPath]) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}

const problemTemplate = `export default function(input) {
  return 0;
}

export const expectedValue = 0;
`;

fs.writeFileSync(problem1sPath, problemTemplate, { encoding: 'utf8' });
fs.writeFileSync(problem2sPath, problemTemplate, { encoding: 'utf8' });
fs.writeFileSync(testPath, '', { encoding: 'utf8' });

const url = path.join(
  'https://adventofcode.com',
  year.toString(),
  'day',
  day.toString(),
  'input',
);


if (!cookie) {
  console.log(chalk.red(`no session cookie provided, the process won't be unable to download the input file`));
  process.exit();
}

const response = await fetch(url, {
  headers: {
    cookie: ['session', cookie].join('='),
  }
});
const data = await response.text();
fs.writeFileSync(inputPath, data, { encoding: 'utf8' });
