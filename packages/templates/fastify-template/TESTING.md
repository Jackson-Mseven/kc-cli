# 测试指南

本项目使用 Vitest 和 Supertest 进行单元测试和接口测试。

## 运行测试

```bash
# 运行所有测试
pnpm test

# 以监听模式运行测试
pnpm test:watch

# 运行测试并生成覆盖率报告
pnpm test:coverage

# 运行特定测试文件
pnpm vitest run test/basic.test.ts
```

## 测试文件结构

测试文件位于 `test` 目录下，使用以下命名约定：

- `*.test.ts`: 单元测试文件
- `*.spec.ts`: 集成测试文件

目前包含：

- 基础测试示例 (`test/basic.test.ts`)
- 用户路由测试 (`test/routes/user.test.ts`)

## 编写测试

### 基本测试结构

```typescript
import { describe, it, expect } from 'vitest'

describe('功能名称', () => {
  it('应该做某事', () => {
    expect(1 + 1).toBe(2)
  })
})
```

### 测试钩子

Vitest 提供了多个钩子函数，用于在测试前后执行代码：

```typescript
import { describe, it, beforeEach, afterEach } from 'vitest'

describe('测试组', () => {
  beforeEach(() => {
    // 每个测试前执行
  })

  afterEach(() => {
    // 每个测试后执行
  })

  it('测试1', () => {
    // 测试代码
  })

  it('测试2', () => {
    // 测试代码
  })
})
```

### 异步测试

```typescript
import { describe, it, expect } from 'vitest'

describe('异步测试', () => {
  it('应该处理异步操作', async () => {
    const result = await someAsyncFunction()
    expect(result).toBe('expected value')
  })
})
```

### 模拟函数 (Mocks)

```typescript
import { describe, it, expect, vi } from 'vitest'

describe('模拟函数', () => {
  it('应该调用模拟函数', () => {
    const mockFn = vi.fn()
    mockFn('arg')

    expect(mockFn).toHaveBeenCalled()
    expect(mockFn).toHaveBeenCalledWith('arg')
  })
})
```

### API 测试

对于 API 测试，我们可以使用 Fastify 的 `inject` 方法进行请求模拟：

```typescript
import { describe, it, expect } from 'vitest'
import Fastify from 'fastify'

describe('API 测试', () => {
  it('GET / 应该返回状态码 200', async () => {
    const app = Fastify()

    // 注册路由
    app.get('/', async () => {
      return { hello: 'world' }
    })

    // 发送请求
    const response = await app.inject({
      method: 'GET',
      url: '/',
    })

    // 断言
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body)).toEqual({ hello: 'world' })
  })
})
```

## 最佳实践

1. **测试隔离**: 每个测试应该是独立的，不依赖于其他测试的状态
2. **模拟外部依赖**: 使用 `vi.mock()` 模拟外部依赖，如数据库、API 等
3. **合理使用断言**: 只断言必要的内容，避免过度测试
4. **测试边界条件**: 不仅测试正常情况，还要测试边界条件和错误情况
5. **保持测试简单**: 每个测试只测试一个行为或功能点

## 进阶测试

对于更复杂的测试场景，如需要模拟数据库、外部 API 等，可以使用以下方法：

### 模拟 Prisma

```typescript
import { describe, it, expect, vi } from 'vitest'
import { PrismaClient } from '@prisma/client'

// 模拟 Prisma 客户端
vi.mock('@prisma/client', () => {
  return {
    PrismaClient: vi.fn().mockImplementation(() => ({
      user: {
        findMany: vi.fn().mockResolvedValue([{ id: 1, name: 'Test User' }]),
      },
    })),
  }
})

describe('Prisma 测试', () => {
  it('应该返回模拟用户数据', async () => {
    const prisma = new PrismaClient()
    const users = await prisma.user.findMany()

    expect(users).toEqual([{ id: 1, name: 'Test User' }])
  })
})
```

### 集成测试

对于需要测试多个组件协同工作的场景，可以使用集成测试：

```typescript
import { describe, it, expect } from 'vitest'
import app from '../src/app'
import supertest from 'supertest'

describe('集成测试', () => {
  it('完整的用户创建流程', async () => {
    // 创建用户
    const createResponse = await supertest(app.server).post('/user').send({
      username: 'testuser',
      password: 'password',
      email: 'test@example.com',
    })

    expect(createResponse.statusCode).toBe(201)
    const userId = createResponse.body.data.id

    // 获取用户
    const getResponse = await supertest(app.server).get(`/user/${userId}`)

    expect(getResponse.statusCode).toBe(200)
    expect(getResponse.body.data.username).toBe('testuser')
  })
})
```

## 故障排除

常见问题及解决方案：

1. **TypeScript 导入错误**: 确保 `vitest.config.ts` 正确配置了路径别名
2. **模块导入错误**: 检查是否正确模拟了外部依赖
3. **测试超时**: 增加测试超时时间 `it('test', async () => {}, { timeout: 10000 })`
4. **异步测试失败**: 确保使用了 `async/await` 或正确处理了 Promise
