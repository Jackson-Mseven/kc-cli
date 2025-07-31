# Fastify 后端模板

这是一个基于 Fastify 框架的后端应用模板，集成了多种常用功能和插件，帮助您快速搭建现代化的 Node.js 后端服务。

## 特性

- 基于 Fastify v5 高性能 Web 服务器
- TypeScript 支持，提供类型安全
- Prisma ORM 与 PostgreSQL 集成
- Zod 类型验证
- Swagger API 文档自动生成
- 内置错误处理机制
- 插件化架构，易于扩展
- 完善的用户 CRUD API 实现
- 环境变量配置支持
- ESLint + Prettier 代码质量和风格管理
- Husky + lint-staged 提交前代码检查
- Commitlint + Commitizen 规范化提交信息
- Vitest + Supertest 单元测试和接口测试

## 技术栈

- **Fastify**: 高性能 Web 框架
- **TypeScript**: 类型安全的 JavaScript 超集
- **Prisma**: 现代化的数据库 ORM
- **PostgreSQL**: 关系型数据库
- **Zod**: 数据验证库
- **Swagger**: API 文档生成
- **pnpm**: 高效的包管理器
- **ESLint**: 代码质量检查工具
- **Prettier**: 代码格式化工具
- **Husky**: Git Hooks 工具
- **lint-staged**: 针对暂存文件运行检查
- **Commitlint**: 提交信息规范检查
- **Commitizen**: 交互式提交信息生成
- **Vitest**: 现代化的测试框架
- **Supertest**: HTTP 接口测试工具

## 开始使用

### 前置要求

- Node.js 16+
- pnpm 10+
- PostgreSQL 数据库

### 安装依赖

```bash
pnpm install
```

### 初始化ORM（Prisma）

```bash
npx prisma generate
npx prisma db push
```

### 代码质量和格式化

```bash
# 代码检查
pnpm lint

# 代码检查并自动修复
pnpm lint:fix

# 代码格式化
pnpm format
```

### 运行测试

```bash
# 运行所有测试
pnpm test

# 以监听模式运行测试
pnpm test:watch

# 运行测试并生成覆盖率报告
pnpm test:coverage
```

### Git 提交规范

项目使用 Commitizen 和 Commitlint 来规范化 Git 提交信息，支持以下类型的提交：

- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档修改
- `style`: 代码格式修改（不影响代码运行）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动
- `revert`: 回退
- `build`: 打包
- `ci`: CI/CD 相关

使用以下命令来创建符合规范的提交：

```bash
pnpm commit
```

### 启动开发服务器

```bash
pnpm dev
```

服务将在 `http://0.0.0.0:3000` 运行，API 文档可以通过 `/documentation` 访问。

### 生产环境构建

```bash
pnpm build
pnpm start
```

## 项目结构

```
fastify-template/
├── .env                   # 环境变量配置
├── .eslintrc.json         # ESLint 配置
├── .eslintignore          # ESLint 忽略文件
├── .husky/                # Git Hooks 配置
├── .lintstagedrc.js       # lint-staged 配置
├── .prettierrc            # Prettier 配置
├── .prettierignore        # Prettier 忽略文件
├── commitlint.config.js   # Commitlint 配置
├── package.json           # 项目配置和依赖
├── pnpm-lock.yaml         # pnpm 包锁定文件
├── prisma/                # Prisma ORM 配置
│   └── schema.prisma      # 数据库模型定义
├── public/                # 静态资源目录
├── src/                   # 源代码
│   ├── app.ts             # Fastify 应用实例和配置
│   ├── constants/         # 常量定义
│   │   ├── env.ts         # 环境变量配置
│   │   ├── error.ts       # 错误常量
│   │   ├── logger.ts      # 日志配置
│   │   └── swagger.ts     # Swagger 配置
│   ├── plugins/           # Fastify 插件
│   │   ├── postgres.ts    # PostgreSQL 连接插件
│   │   ├── prisma.ts      # Prisma 客户端插件
│   │   └── reply/         # 响应处理插件
│   │       ├── sendDefaultError.ts
│   │       └── sendResponse.ts
│   ├── routes/            # API 路由定义
│   │   └── user/          # 用户相关 API
│   │       └── index.ts   # 用户 CRUD 接口
│   ├── schemas/           # 数据模式定义
│   │   └── response.ts    # 响应数据模式
│   ├── server.ts          # 服务器启动入口
│   ├── types/             # TypeScript 类型定义
│   │   ├── env.ts
│   │   ├── project.ts
│   │   ├── response.ts
│   │   ├── role.ts
│   │   └── user.ts
│   └── utils/             # 工具函数
│       └── prisma/
│           └── buildError.ts  # Prisma 错误处理
├── test/                  # 测试目录
│   ├── setup.ts           # 测试环境设置
│   └── routes/            # 路由测试
│       └── user.test.ts   # 用户路由测试
└── tsconfig.json          # TypeScript 配置
└── vitest.config.ts       # Vitest 配置
```

## API 接口

项目内置了完整的用户管理 API：

- `GET /user` - 获取所有用户
- `GET /user/:id` - 获取单个用户
- `POST /user` - 创建新用户
- `PUT /user/:id` - 更新用户信息
- `DELETE /user/:id` - 删除用户

访问 `/documentation` 查看完整的 Swagger API 文档。

## 扩展功能

### 添加新路由

1. 在 `src/routes` 目录下创建新的文件夹和文件
2. 遵循现有的路由模式，使用 Fastify 插件格式

### 添加新的 Prisma 模型

1. 运行 `npx prisma db pull` 从数据库中获取表模型
2. 运行 `npx prisma generate` 生成客户端

## 贡献

欢迎提交 Issue 或 Pull Request。

## 许可证

ISC
