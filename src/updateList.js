import Cli from './';
import clear from 'clear';

const readline = require('./readline')
const charm2 = require('charm')()
charm2.pipe(process.stdout)
charm2.reset()
const chalk = require('chalk');
const boxen = require('boxen');
const warning = chalk.keyword('orange');
const { updateCommand } = require('./update');

export const updateList = () => {
  let rawList = Cli.rawList()
  
  if(rawList){
    if(rawList.length > 0){
      console.log(warning('Which endpoint : \n'))
    
      let selected = 0
      
      const renderUpdate = () => {
        rawList.map((el, i) => {
          charm2.foreground("cyan")
          charm2.write('[' + (i === selected ? "X" : " ") + "] ");
          (i !== selected) && charm2.foreground("white")
          charm2.write(`method: ${el.method}, path: ${el.path} ` + "\n")
          charm2.foreground("white")
        })
      }
    
      process.stdin.on("keypress", (s, key) => {
        if(key.name === 'up' && (selected - 1) >= 0){
          selected--;
        }else if(key.name === 'down' && (selected + 1) < rawList.length){
          selected++;
        }else if(key.name === 'up' && (selected - 1) < 0){
          selected = rawList.length - 1
        }else if(key.name === 'down' && (selected + 1) === rawList.length){
          selected = 0
        }else{
          return;
        }
        
        charm2.erase("line")
        rawList.map(() => {
          charm2.up(1)
          charm2.erase("line");
        })
        renderUpdate()
      })
    
      renderUpdate()
      
      readline.on("line", (line) => {
        charm2.destroy()
        if(rawList[selected]){
          updateCommand(rawList[selected].id)
        }
        selected = 100000
      }).on("close", () => {
        readline.close();
        process.exit(0)
      })
    }else{
      console.log(chalk.red(boxen('\nSorry but your endpoint list is empty!', { padding: 1 })))
      readline.question('Do you want to make endpoint ? (yes or no) ', (answer) => {
        if(answer === 'yes' || answer === 'y'){
          console.clear()
          Cli.create()
        }else{
          readline.close()
        }
      })
    }
  }
}