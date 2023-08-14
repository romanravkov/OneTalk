module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-templates/component/Component.js.hbs',
      },
    ],
  });
  plop.setGenerator('screen', {
    description: 'Create a screen',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your screen name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/screens/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-templates/screen/index.js.hbs',
      },
      {
        type: 'add',
        path: 'src/screens/{{pascalCase name}}/{{pascalCase name}}View.tsx',
        templateFile: 'plop-templates/screen/view.js.hbs',
      },
    ],
  });
};
