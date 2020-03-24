import Cli from '.';
import fs from 'fs';
import boxen from 'boxen';
import ora from 'ora';
import chalk from 'chalk';
const readline = require('./readline');
const { updateList }  = require('./updateList')

export const DeleteEndpoint = () => {
  let rawList = Cli.rawList()
  if(rawList){
    if(rawList.length > 0){
      Cli.list(false)
      readline.question(`\nEndpoint's ID: `, (id) => {
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

export const UpdateEndpoint = () => {
  updateList()
}
