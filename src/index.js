import cliInit from './init';
import cliRun from './run';
import cliConvert from './convert';
import cliGenerate from './endpoints';
import cliList from './list';

export default class Cli {
  static init() {
    return cliInit();
  }

  static run() {
    return cliRun();
  }

  static convert() {
    return cliConvert();
  }

  static create() {
    return cliGenerate();
  }
}
