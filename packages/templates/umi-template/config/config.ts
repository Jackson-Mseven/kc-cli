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
});
