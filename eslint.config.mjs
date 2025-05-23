import js from "@eslint/js";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // 核心规则集
  js.configs.recommended,

  // Node.js 环境配置
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest", // ES2024 支持
      sourceType: "script", // Node.js 默认模块类型
      globals: {
        ...globals.node, // 注入 Node.js 全局变量（如 process、module）
        __dirname: "readonly", // 补充 CommonJS 特有全局变量
        __filename: "readonly",
      },
    },
    rules: {
      "no-console": "warn",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "prefer-const": "error",
    },
  },

  // 测试文件特殊配置
  {
    files: ["**/*.test.js"],
    languageOptions: {
      globals: {
        ...globals.jest, // 注入 Jest 测试框架全局变量（如 describe、test）
      },
    },
  },

  // Prettier 集成（必须置于最后）
  eslintConfigPrettier,
];
