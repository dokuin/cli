const fs = require('fs');
const colors = require('colors');
const chalk = require('chalk');
const boxen = require('boxen');
const readline = require('./readline');
const ora = require('ora');

export default () => {
  const questionArray = [
    {
      name: 'name',
      question: 'Project Name: '
    },
    {
      name: 'description',
      question: 'Project Description: '
    },
    {
      name: 'baseURL',
      question: 'Project Base URL: '
    },
    {
      name: 'author',
      question: 'Project Author: '
    },
  ];

  let cli = {};
  
  console.log(chalk.bold.cyan(boxen(`⚙️ Welcome to dokuin, There is no easier way to create open source RESTful Api documentation website : `, { padding: 1 })));

  cli.init = () => {
    let totalQuestion = questionArray.length;
    let index = 0;
    const data = {};
    cli.question = () => {
      readline.question(questionArray[index].question, value => {
        data[questionArray[index].name] = value;
        index++;
        if (index < totalQuestion) {
          cli.question();
        } else {
          fs.writeFileSync('dokuin.config.json', JSON.stringify(data, null, 2));
          fs.writeFileSync('dokuin.endpoints.json', JSON.stringify([], null, 2));
          const spinner = ora('Your configuration are still being created').start()
          spinner.succeed('Your configuration have been created')
          readline.close();
        }
      });
    };
    cli.question();
  };
  cli.init();
};
