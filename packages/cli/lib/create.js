const prompts = require('prompts');

const create = async () => {
  const { name, type } = await prompts([{
    type: 'text',
    name: 'name',
    message: 'What is the name of your project?',
    initial: __dirname.split('/').pop(),
  },
    {
      type: 'select',
      name: 'type',
      message: 'What is the type of your project?',
      choices: [
        { title: 'React', value: 'react' },
        { title: 'Vue', value: 'vue' },
        { title: 'Angular', value: 'angular' },
      ],
    },
  ]);
};

module.exports = exports = create;
