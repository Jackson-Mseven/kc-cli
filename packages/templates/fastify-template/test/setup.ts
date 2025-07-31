import { beforeAll, afterAll, vi } from 'vitest'
import app from './app'

// 模拟 process.exit 防止测试提前退出
vi.spyOn(process, 'exit').mockImplementation(code => {
  console.log(`[TEST] process.exit called with code ${code}`)
  return undefined as never
})

// 模拟 Prisma 客户端
export const mockPrismaClient = {
  user: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}

// 在所有测试之前运行
beforeAll(async () => {
  // 替换 app 中的 prisma 实例为模拟实例
  app.decorate('prisma', mockPrismaClient)

  // 等待 app 准备就绪
  await app.ready()
})

// 在所有测试之后运行
afterAll(async () => {
  await app.close()
})

// 在每次测试之前重置所有模拟函数
export const resetMocks = () => {
  vi.resetAllMocks()
}

// 模拟用户数据
export const mockUsers = [
  {
    id: 1,
    username: 'testuser1',
    password: 'password123',
    email: 'test1@example.com',
    created_at: new Date(),
  },
  {
    id: 2,
    username: 'testuser2',
    password: 'password456',
    email: 'test2@example.com',
    created_at: new Date(),
  },
]

// 导出 app 实例供测试使用
export { app }
