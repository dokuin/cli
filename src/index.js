// NPM MODULES
import fs from 'fs';
import chalk from 'chalk';

// COMMAND FUNCTIONS
import cliStart from './start';
import cliInit from './init';
import cliRun from './run';
import cliConvert from './convert';
import cliGenerate from './endpoints';
import { DeleteEndpoint } from './mutation';
import { checkEligible } from '../helpers';
import readline from './readline';

export default class Cli {
  static start(){
    return cliStart()
  }

  static init() {
    return cliInit();
  }

  static create() {
    return cliGenerate();
  }

  static run() {
    return checkEligible() ? cliRun() : readline.close();
  }

  static convert() {
    return checkEligible() ? cliConvert() : readline.close();
  }

  static add() {
    return cliGenerate(true);
  }

  static rawList(){
    if(fs.existsSync(`${process.cwd()}/dokuin.endpoints.json`)){
      const list = fs.readFileSync(`${process.cwd()}/dokuin.endpoints.json`, 'utf-8')
      return JSON.parse(list)
    }else{
      console.clear()
      console.log(chalk.red(`\nPlease make the configuration first: \n`))
      Cli.init()
    }
  }

  static list(autoclose = true){
    const list = Cli.rawList()
    const tableList = []   
    list.forEach(list => {
      let row = {
        id: list.id,
        method: list.method,
        path: list.path,
        description: list.description
      }
      tableList.push(row)
    })
    console.log(chalk.bold.cyan('\nYour endpoint list: \n'))
    console.table(tableList)
    
    if(autoclose){
      process.exit(0)
    }
  }

  static delete(){
    return DeleteEndpoint()
  }
}
