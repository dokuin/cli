const fs = require('fs');
const chalk = require('chalk');
const boxen = require('boxen');
const readline = require('./readline');

export default () => {
  const questionArray = [
    {
      name: 'projectName',
      question: 'What is your project name ? '
    },
    {
      name: 'author',
      question: 'Who is your author ? '
    }
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
          readline.close();
        }
      });
    };
    cli.question();
  };
  cli.init();
};
