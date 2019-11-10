module.exports = plop => {
  plop.setGenerator('bee', {
    description : 'Create a bee',
    prompts     : [
      {
        // Raw text input
        type    : 'input',
        // Variable name for this input
        name    : 'name',
        // Prompt to display on command line
        message : 'What is your action name?',
      },
      {
        // Raw text input
        type    : 'input',
        // Variable name for this input
        name    : 'payload',
        // Prompt to display on command line
        message : 'What is in the payload?',
      },
    ],
    actions : [
      {
        // Add a new file
        type         : 'add',
        // Path for the new file
        path         : 'src/bees/{{pascalCase name}}.js',
        // Handlebars template used to generate content of new file
        templateFile : 'plop-templates/Ant.js.hbs',
      },
    ],
  })
}
