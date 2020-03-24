export const questionArray = [
  {
    name: 'method',
    question: 'HTTP Method: '
  },
  {
    name: 'path',
    question: 'Path: '
  },
  {
    name: 'description',
    question: 'Endpoint description: '
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

export const commandList = [
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
    key: 'update',
    question: "Update an endpoint on the list"
  },
  {
    key: 'delete',
    question: "Delete endpoint in existing endpoint list"
  }
]

export const updateQuestionList = [
  {
    key: 'method',
    question: 'method',
    type: 'string'
  },
  {
    key: 'path',
    question: 'path',
    type: 'string'
  },
  {
    key: 'description',
    question: 'description',
    type: 'string'
  },
  {
    key: 'headers',
    question: 'headers',
    type: 'object'
  },
  {
    key: 'query',
    question: 'query',
    type: 'object'
  },
  {
    key: 'body',
    question: 'body',
    type: 'object'
  }
]

export const updateString = (key) => [
  {
    key,
    question: `Your new ${key}`,
  },
  {
    key: 'next',
    question: 'More update ? (yes or no) '
  }
]

export const updateObject = (key) => [
  {
    key,
    nestedQuestion: [
      {
        name: 'key',
        question: 'Key: ',
      },
      {
        name: 'value',
        question: 'Value: ',
      }
    ]
  }
]