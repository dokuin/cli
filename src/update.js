import Cli from './';
import fs from 'fs';

const ora = require('ora');
const readline = require('./readline')
const charm2 = require('charm')(process.stdout)
const chalk = require('chalk');
const boxen = require('boxen');
const warning = chalk.keyword('orange');
const { updateQuestionList, updateString, updateObject } = require('./endpointQuestion');
const { updateList } = require('./updateList');

export const updateCommand = (id) => {
  let rawList = Cli.rawList()
  let isEndpointExist = rawList.find(list => list.id === id)
  if(rawList.length > 0){
    console.log(warning('Which key : \n'))
    
    let questionArray = updateQuestionList
    let selected = 0
    
    const renderUpdate = () => {
      questionArray.map((el, i) => {
        charm2.foreground("cyan")
        charm2.write('[' + (i === selected ? "X" : " ") + "] ");
        (i !== selected) && charm2.foreground("white")
        charm2.write(el.key + "\n")
        charm2.foreground("white")
      })
    }
  
    process.stdin.on("keypress", (s, key) => {
      if(key.name === 'up' && (selected - 1) >= 0){
        selected--;
      }else if(key.name === 'down' && (selected + 1) < questionArray.length){
        selected++;
      }else if(key.name === 'up' && (selected - 1) < 0){
        selected = questionArray.length - 1
      }else if(key.name === 'down' && (selected + 1) === questionArray.length){
        selected = 0
      }else{
        return;
      }
      
      charm2.erase("line")
      questionArray.map(() => {
        charm2.up(1)
        charm2.erase("line");
      })
      renderUpdate()
    })
  
    renderUpdate()
    
    readline.on("line", (line) => {
      // charm2.destroy()
      if(questionArray[selected]){
        ActionUpdate(id, questionArray[selected].key, typeof isEndpointExist[questionArray[selected].key])
      }
      selected = 100000
    }).on("close", () => {
      readline.close();
      process.exit(0)
    })
  }else{
    console.log(chalk.red(boxen('Sorry but endpoint doesnt exist!', { padding: 1 })))
  }
}

export const ActionUpdate = (id, key, type) => {
  let list = Cli.rawList()
  let index = 0
  let update = {}
  let questions = {}
  if(type === 'string'){
    questions = updateString(key)
    console.log(chalk.bold.cyan(`Current value: ${list[id - 1][key]}\n`))
    update.string = () => {
      readline.question(`${questions[index].question}: `, (answer) => {
        if(index === 0){
          list[id - 1][key] = answer
        }
        index++

        if(index < 2){
            update.string()
            fs.writeFile('dokuin.endpoints.json', JSON.stringify(list, null, 2), (err) => {
              if(err){
                console.log(err)
              }
            })
        }else{
          if(answer === 'yes' || answer === 'y'){
            console.clear()
            updateCommand(id)
          }else{
            const spinner = ora('Your endpoint are still being updated').start()
            fs.writeFile('dokuin.endpoints.json', JSON.stringify(list, null, 2), (err) => {
              if(err){
                console.log(err)
              }else{
                spinner.succeed('Your endpoint have been updated')
                readline.close()
              }
            })
          }
        }
      })
    }
    update.string()
  }else{
    const field = list[id - 1][key]
    chooseUpdateObject(id, key, field)
  }
}

export const chooseUpdateObject = (id, key, field) => {
    let list = Cli.rawList()
    let questions = field
    let selected = 0
    
    console.log(warning('Which one : \n'))

    const renderUpdate = () => {
      let i = 0
      for(let key in questions){
        charm2.foreground("cyan")
        charm2.write('[' + (i === selected ? "X" : " ") + "] ");
        (i !== selected) && charm2.foreground("white")
        charm2.write(`key: ${key}, value: ${questions[key]}` + "\n")
        charm2.foreground("white")
        i++
      }
    }
  
    process.stdin.on("keypress", (s, key) => {
      if(key.name === 'up' && (selected - 1) >= 0){
        selected--;
      }else if(key.name === 'down' && (selected + 1) < Object.values(questions).length){
        selected++;
      }else if(key.name === 'up' && (selected - 1) < 0){
        selected = Object.values(questions).length - 1
      }else if(key.name === 'down' && (selected + 1) === Object.values(questions).length){
        selected = 0
      }else{
        return;
      }
      
      charm2.erase("line")
      for(let key in questions){
        charm2.up(1)
        charm2.erase("line");
      }
      renderUpdate()
    })
  
    renderUpdate()
    
    readline.on("line", (line) => {
      charm2.destroy()
      if(Object.keys(field)[selected]){
        console.log(chalk.bold.cyan(`Current value: ${Object.values(field)[selected]}`))
        const keys = Object.keys(field)[selected]
        readline.question(`${keys}: `, (value) => {
          field[keys] = value
          list[id - 1][key] = field 
          fs.writeFile('dokuin.endpoints.json',JSON.stringify(list, null, 2), (err) => {
            if(err){
              console.log(err)
            }else{
              readline.question('More update ? (yes or no) ', (asnw) => {
                if(asnw === 'yes' || asnw == 'y'){
                  console.clear()
                  updateCommand(id)
                }else{
                  ora().succeed('Your endpoint have been updated')
                  readline.close()
                }
              })
            }
          })
        })

      }
      selected = 100000
    }).on("close", () => {
      readline.close();
      process.exit(0)
    })
}