import cliInit from './init';
import cliGenerate from './endpoints';

export default class Cli {
  static init() {
    return cliInit();
  }

  static cliGenerate(){
    return cliGenerate();
  }
}
