const fs = require('fs');
const endpoints = {}
const readline = require('./readline');
const chalk = require('chalk');
const boxen = require('boxen')
const warning = chalk.keyword('orange')
const ora = require('ora');

export default () => {
  console.log(chalk.bold.cyan(boxen('Dokuin endpoints configuration: ', { padding: 1 })))
  console.log(warning('Fill these to create endpoints \n'))
  const questionArray = [
    {
      name: 'method',
      question: 'HTTP Method: '
    },
    {
      name: 'path',
      question: 'Path: '
    },
    {
      name: 'headers',
      question: 'Add Headers ? (yes or no) ',
      nestedQuestion: [
        {
          name: 'key',
          question: 'Key: ',
        },
        {
          name: 'value',
          question: 'Value: ',
        },
        {
          name: 'next',
          question: 'Add more headers ? (yes or no) '
        }
      ]
    },
    {
      name: 'query',
      question: 'Add Query Params ? (yes or no) ',
      nestedQuestion: [
        {
          name: 'key',
          question: 'Key: ',
        },
        {
          name: 'value',
          question: 'Value: ',
        },
        {
          name: 'next',
          question: 'Add more query params ? (yes or no) '
        }
      ]
    },
    {
      name: 'body',
      question: 'Add Request Body ? (yes or no) ',
      nestedQuestion: [
        {
          name: 'key',
          question: 'Key: ',
        },
        {
          name: 'value',
          question: 'Value: ',
        },
        {
          name: 'next',
          question: 'Add more request body ? (yes or no) '
        }
      ]
    },
    {
      name: 'next',
      question: 'Add more endpoints ? (yes or no) '
    }
  ]
  
  const listEndpoint = []
  endpoints.init = () => {
    let totalQuestion = questionArray.length
    let index = 0
    const data = {}
    endpoints.question = () => {
      readline.question(questionArray[index].question, (value) => {
        
        if(questionArray[index].name === 'method' || questionArray[index].name === 'url' || questionArray[index].name === 'path'){
          data[questionArray[index].name] = value
          index++
        }else{
          if(questionArray[index].name !== 'next'){
            data[questionArray[index].name] = {}
            if(value === 'yes' || value === 'y'){
              console.clear()
              console.log(chalk.bold.cyan(`${questionArray[index].name} configuration:\n`))
              let totalNestedQuestion = 3
              let nestedIndex = 0
              let key = ''
              let nestedData = {}
              let values = ''
              endpoints.nestedQuestion = () => {
                readline.question(questionArray[index].nestedQuestion[nestedIndex].question, (text) => {
                  if(nestedIndex === 0){
                    key = text
                  }else if(nestedIndex === 1){
                    values = text
                  }

                  nestedIndex++
                  if(nestedIndex < totalNestedQuestion){
                    endpoints.nestedQuestion()
                  }else{
                    if(text == 'yes' || text === 'y'){
                      nestedData[key] = values
                      data[questionArray[index].name] = nestedData
                      nestedIndex = 0
                      endpoints.nestedQuestion()
                    }else{
                      nestedData[key] = values
                      data[questionArray[index].name] = nestedData
                      index++
                      endpoints.question()
                    }
                  }
                })
              }
              endpoints.nestedQuestion()
            }else{
              index++
            }
          }else{
            index++
          }
        }
        if(index < totalQuestion){
          endpoints.question()
        }else{
          if(value === 'yes' || value === 'y'){
            console.clear()
            listEndpoint.push(data)
            endpoints.init()
          }else{
            listEndpoint.push(data)
            const spinner = ora('Your endpoints are still being created').start()
            fs.writeFile('dokuin.endpoints.json', JSON.stringify(listEndpoint, null, 2), (err, done) => {
              if(err){
                console.log('error')
              }else{
                spinner.succeed('Your endpoints have been created')
                readline.close()
              }
            })
          }
        }
      })
    }
    endpoints.question()
  }
  endpoints.init()
}