module.exports = {
  types: [
    { value: "feat", name: "feat: 新功能" },
    { value: "fix", name: "fix: Bug修复" },
    { value: "docs", name: "docs: 文档更新" },
    { value: "style", name: "style: 代码格式优化（空格、分号等）" },
    { value: "refactor", name: "refactor: 重构代码（非功能/非Bug修改）" },
    { value: "perf", name: "perf: 性能优化" },
    { value: "test", name: "test: 测试代码" },
    { value: "chore", name: "chore: 构建或工具链变更" },
  ],
  scopes: [
    { name: "entry" },
    { name: "cli" },
    { name: "umi-template" },
    { name: "next-template" },
    { name: "fastify-template" },
  ],
  messages: {
    type: "选择提交类型：",
    scope: "选择影响范围（可选）：",
    subject: "简短描述（不超过50字符）：\n",
    body: '详细说明（使用 "|" 换行）：\n',
    confirmCommit: "确认提交？",
  },
};
