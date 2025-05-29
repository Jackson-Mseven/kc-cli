/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {
      // 可选配置项（多数项目无需修改）
      // prefix: 'tw-',  // 自定义类名前缀
      // important: true // 启用 !important
    },
    autoprefixer: {}
  }
};

export default config;
