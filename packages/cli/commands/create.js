const prompts = require('prompts');

const create = async () => {
  const { name, type } = await prompts([{
    type: 'text',
    name: 'name',
    message: "What's the name of your project?",
    initial: __dirname.split('/').pop(),
  },
    {
      type: 'select',
      name: 'type',
      message: 'What is the type of your project?',
      choices: [
        { title: 'Umi', value: 'umi' },
        { title: 'Vite', value: 'vite' },
        { title: 'Next', value: 'next' },
      ],
    },
  ]);
};

module.exports = exports = create;
