const path = require('path');

module.exports = {
  root: true,
  extends: require.resolve('@umijs/max/eslint'),
  settings: {
    'import/resolver': {
      node: {
        // 使用绝对路径确保准确性
        moduleDirectory: [
          path.join(__dirname, 'node_modules'), // 子包 node_modules
          path.join(__dirname, '../../node_modules'), // 根目录 node_modules
        ],
      },
    },
  },
};
