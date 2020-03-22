// COMMANDS
import init from './init';
import run from './run';
import convert from './convert';
import create from './endpoints';

// LOCALS
import { checkEligible } from '../helpers';
import readline from './readline';

const mainCommand = process.argv[2];

switch (mainCommand) {
  case 'init':
    init();
    break;

  case 'run':
    checkEligible() ? run() : readline.close();
    break;

  case 'convert':
    checkEligible() ? convert() : readline.close();
    break;

  case 'create':
    create();
    break;
}
