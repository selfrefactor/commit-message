import { glue } from 'rambdax'
const enter = 'Submit by pressing \'Enter\''

function input(namespace: string, instruction: string) {

  return {
    element: `#${namespace}_input`,
    popover: {
      description: instruction,
      position: 'bottom',
      title: 'Input field',
    },
  }
}

function question(namespace: string, instruction: string) {

  return {
    element: `#${namespace}_question`,
    popover: {
      description: instruction,
      position: 'bottom',
      title: 'Question',
    },
  }
}

function context(namespace: string) {

  return {
    element: `#${namespace}_context`,
    popover: {
      description: 'This is a context to help you figure out the answer',
      position: 'bottom',
      title: 'Context',
    },
  }
}

function image(namespace: string, instruction:string) {

  return {
    element: `#${namespace}_image`,
    popover: {
      description: instruction,
      position: 'top',
      title: 'Image',
    },
  }
}

function answer(namespace: string, instruction: string) {

  return {
    element: `#${namespace}_answer`,
    popover: {
      description: instruction,
      position: 'bottom',
      title: 'Answer',
    },
  }
}

function translated(namespace: string, instruction: string ) {

  return {
    element: `#${namespace}_translated`,
    popover: {
      description: instruction,
      position: 'top',
      title: 'Translation',
    },
  }
}

function navigation() {
  return {
    element: `#toggle-navigation`,
    popover: {
      description: 'Change to different application',
      position: 'top',
      title: 'Navigate',
    },
  }
}

function random() {
  return {
    element: `.toggle-random`,
    popover: {
      description: 'Go to a random question',
      position: 'top',
      title: 'Random',
    },
  }
}

function changeLanguage() {
  return {
    element: `.change-language`,
    popover: {
      description: 'Change application\'s languages',
      position: 'top',
      title: 'Change language direction',
    },
  }
}

function toggleSpeech() {
  return {
    element: `.toggle-speech`,
    popover: {
      description: 'Turn on text-to-speech functionality',
      position: 'top',
      title: 'Speak when question is completed',
    },
  }
}

function submitAnswer() {
  return {
    element: `.submit-answer`,
    popover: {
      description: 'It works for all applications',
      position: 'top',
      title: 'Submit your answer',
    },
  }
}

function nextInstance() {
  return {
    element: `.next-instance`,
    popover: {
      description: 'It works for all applications',
      position: 'top',
      title: 'Proceed to the next question.',
    },
  }
}

const carrier = [
  'changeLanguage',
  'random',
  'toggleSpeech',
  'submitAnswer',
  'nextInstance',
  'navigation',
]

const lmInput = [
  { question: 'This is a hidden word that you need to guess correctly' },
  'context',
  { input: `This is a hidden word that you need to guess correctly.${enter}` },
  {translated: 'Translation of the context section'},
  {image: 'This is image related to the context'},
  ...carrier,
]

const wsInput = [
  { question: glue(`
    This is sentence with missing middle part of its words.
    The word with the border is the focused word.
    You need to type your suggestion for it in the input field.
  `) },
  { input: glue(`
    Write your suggestion for 
    the focused word and 
    then press 'Space'
  `) },
  {translated: 'Translation of the sentence'},
  { answer: `You will see the correct words here` },
  {image: 'This is image related to the sentence'},
  ...carrier,
]

const generator = {
  answer,
  changeLanguage,
  context,
  image,
  input,
  navigation,
  nextInstance,
  question,
  random,
  submitAnswer,
  toggleSpeech,
  translated,
}

function generateSteps(namespace: string, namespaceInput: any[]) {

  return namespaceInput.map(singleInput => {
    if (typeof singleInput === 'string') {

      return generator[singleInput](namespace)
    }

    const [key, value] = Object.entries(singleInput)[0]

    return generator[key](namespace, value)
  })
}

const lm = generateSteps('lm', lmInput)
const ws = generateSteps('ws', wsInput)

const info = {
  lm,
  ws
}

export function infoSteps(namespace: string): object[] {
  return info[namespace]
}
