import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  routes,
  npmClient: 'yarn',
  alias: {
    config: '/config',
  },
  plugins: ['@umijs/plugins/dist/locale'],
  locale: {
    default: 'zh-CN',
    baseSeparator: '-',
  },
  autoprefixer: {
    grid: true, // 启用 CSS Grid 布局前缀
    flexbox: 'no-2009', // 兼容旧版 Flexbox 语法
  },
});
