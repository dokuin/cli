import Cli from '.';
import fs from 'fs';
import boxen from 'boxen';
import ora from 'ora';
import chalk from 'chalk';
const readline = require('./readline');

export const DeleteEndpoint = () => {
  let rawList = Cli.rawList()
  if(rawList.length > 0){
    Cli.list(false)
    readline.question('\nPlease input the endpoint id to delete endpoint: ', (id) => {
      const spinner = ora(`Your endpoint with id ${id} are still being deleted`).start()
      const newList = rawList.filter(list => list.id != id)
      fs.writeFile('dokuin.endpoints.json', JSON.stringify(newList, null, 2), (err) => {
        if(err){
          console.log(err)
        }else{
          spinner.succeed(`Your endpoint with id ${id} have been deleted`)
          readline.close()
        }
      })
    })
  }else{
    console.log(chalk.red(boxen('Sorry but your endpoint list is empty!', { padding: 1 })))
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
