const fs = require('fs');
const nestedQuestion = require('./nested-question');
const endpoints = {}
const readline = require('./readline');

const questionArray = [
  {
    name: 'method',
    question: 'Method ? '
  },
  {
    name: 'url',
    question: 'Url ? '
  },
  {
    name: 'headers',
    question: 'Isi header (yes or no) ? ',
    nestedQuestion: [
      {
        name: 'key',
        question: 'key ?',
      },
      {
        name: 'value',
        question: 'Value ?',
      },
      {
        name: 'next',
        question: 'Any headers ? (yes or no)'
      }
    ]
  },
  {
    name: 'params',
    question: 'Isi params (yes or no) ? ',
    nestedQuestion: [
      {
        name: 'key',
        question: 'key ?',
      },
      {
        name: 'value',
        question: 'Value ?',
      },
      {
        name: 'next',
        question: 'Any params ? (yes or no)'
      }
    ]
  },
  {
    name: 'query',
    question: 'Isi query (yes or no) ? ',
    nestedQuestion: [
      {
        name: 'key',
        question: 'key ?',
      },
      {
        name: 'value',
        question: 'Value ?',
      },
      {
        name: 'next',
        question: 'Any query ? (yes or no)'
      }
    ]
  },
  {
    name: 'next',
    question: 'Any enpoints ? (yes or no)'
  }
]

const listEndpoint = []
endpoints.init = () => {
  let totalQuestion = questionArray.length
  let index = 0
  const data = {}
  endpoints.question = () => {
    readline.question(questionArray[index].question, (value) => {
      
      if(questionArray[index].name === 'method' || questionArray[index].name === 'url'){
        data[questionArray[index].name] = value
        index++
      }else{
        if(questionArray[index].name !== 'next'){
          data[questionArray[index].name] = {}
          if(value === 'yes'){
            let totalNestedQuestion = 3
            let nestedIndex = 0
            let key = ''
            let nestedData = {}
            endpoints.nestedQuestion = () => {
              readline.question(questionArray[index].nestedQuestion[nestedIndex].question, (text) => {
                if(nestedIndex === 0){
                  key = text
                }
                nestedIndex++
                if(nestedIndex < totalNestedQuestion){
                  endpoints.nestedQuestion()
                }else{
                  if(text == 'yes'){
                    nestedData[key] = text
                    data[questionArray[index].name] = nestedData
                    nestedIndex = 0
                    endpoints.nestedQuestion()
                  }else{
                    nestedData[key] = text
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
        nestedIndex = {}
        endpoints.question()
      }else{
        if(value === 'yes'){
          console.clear()
          listEndpoint.push(data)
          endpoints.init()
        }else{
          data['body'] = {}
          listEndpoint.push(data)
          fs.writeFileSync('dokuin.endpoints.json', JSON.stringify(listEndpoint, null, 2))
          readline.close()
        }
      }
    })
  }
  endpoints.question()
}

endpoints.init()