import CliCommand from './cli';

const readline = require('./readline')
const charm = require('charm')(process.stdout)
const chalk = require('chalk');
const boxen = require('boxen');
const warning = chalk.keyword('orange');

export default () => {

  console.log(chalk.bold.cyan(boxen('Dokuin command list: ', { padding: 1 })))
  console.log(warning('Please choose 1 command : \n'))

  let selected = 0
  let questionArray = [
    {
      key: 'init',
      question: "Create new configuration"
    },
    {
      key: 'create',
      question: "Create new endpoint list"
    },
    {
      key: 'run',
      question: "Run endpoint list"
    },
    {
      key: 'convert',
      question: "Generate Markdown"
    },
    {
      key: 'list',
      question: "Your endpoint list"
    },
    {
      key: 'add',
      question: "Add new endpoint into existing endpoint list"
    },
    {
      key: 'delete',
      question: "Delete endpoint in existing endpoint list"
    }
  ]

  const renderQuestion = () => {
    questionArray.map((el, i) => {
      charm.foreground("cyan")
      charm.write('[' + (i === selected ? "X" : " ") + "] ");
      (i !== selected) && charm.foreground("white")
      charm.write(el.question + "\n")
      charm.foreground("white")
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

    charm.erase("line")
    questionArray.map(() => {
      charm.up(1)
      charm.erase("line");
    })
    renderQuestion()
  })

  renderQuestion()

  readline.on("line", (line) => {
    console.clear();
    CliCommand.command(questionArray[selected].key)
  }).on("close", () => {
    readline.close();
    process.exit(0)
  })
}