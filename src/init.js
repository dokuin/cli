const fs = require('fs');
const colors = require('colors');

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

  console.log(colors.green('⚙️ Dokuin configuration : '));

  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
  });

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
          fs.writeFileSync('dokuin.enpoints.json', JSON.stringify([], null, 2));
          readline.close();
        }
      });
    };
    cli.question();
  };
  cli.init();
};
