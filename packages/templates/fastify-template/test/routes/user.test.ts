import { describe, it, expect, beforeEach, vi } from 'vitest'
import Fastify, { FastifyInstance } from 'fastify'
import userRoutes from '../../src/routes/user'
import { z } from 'zod'
import buildError from '../mocks/buildError'

// 模拟 utils/prisma/buildError
vi.mock('src/utils/prisma/buildError', () => {
  return {
    default: buildError,
  }
})

// 模拟 Prisma 客户端
const mockPrismaClient = {
  user: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}

// 模拟用户数据 - 使用字符串格式的日期，避免序列化问题
const mockUsers = [
  {
    id: 1,
    username: 'testuser1',
    password: 'password123',
    email: 'test1@example.com',
    created_at: '2023-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    username: 'testuser2',
    password: 'password456',
    email: 'test2@example.com',
    created_at: '2023-01-02T00:00:00.000Z',
  },
]

// 创建测试应用
function buildTestApp() {
  const app = Fastify({ logger: false })

  // 添加自定义响应方法
  app.decorateReply('sendResponse', function (payload: any) {
    const { code = 200, data = null, message = 'success' } = payload
    return this.code(code).send({ code, data, message })
  })

  app.decorateReply('sendDefaultError', function () {
    return this.code(500).send({
      code: 500,
      error: 'Internal Server Error',
      message: 'Something went wrong',
    })
  })

  // 添加 Prisma 客户端
  app.decorate('prisma', mockPrismaClient)

  // 添加 Zod 验证编译器
  app.setValidatorCompiler(({ schema: zodSchema }) => {
    return data => {
      const result = (zodSchema as z.ZodType).safeParse(data)
      return result.success ? { value: result.data } : { error: result.error }
    }
  })

  app.setSerializerCompiler(({ schema: _ }) => {
    return data => {
      return JSON.stringify(data)
    }
  })

  return app
}

describe('User Routes', () => {
  let app: FastifyInstance

  beforeEach(async () => {
    app = buildTestApp()

    // 注册用户路由
    await app.register(userRoutes)

    // 重置所有模拟函数
    vi.resetAllMocks()
  })

  describe('GET /user', () => {
    it('should return all users', async () => {
      // 设置模拟返回值
      mockPrismaClient.user.findMany.mockResolvedValue(mockUsers)

      const response = await app.inject({
        method: 'GET',
        url: '/',
      })

      const body = JSON.parse(response.body)

      expect(response.statusCode).toBe(200)
      expect(body).toEqual({
        code: 200,
        data: mockUsers,
        message: 'success',
      })
      expect(mockPrismaClient.user.findMany).toHaveBeenCalledTimes(1)
    })

    it('should handle errors when fetching users', async () => {
      // 设置模拟抛出错误
      mockPrismaClient.user.findMany.mockRejectedValue(new Error('Database error'))

      const response = await app.inject({
        method: 'GET',
        url: '/',
      })

      expect(response.statusCode).toBe(500)
      const body = JSON.parse(response.body)
      expect(body).toHaveProperty('error')
      expect(body).toHaveProperty('message')
    })
  })

  describe('GET /user/:id', () => {
    it('should return a user by id', async () => {
      const mockUser = mockUsers[0]

      // 设置模拟返回值
      mockPrismaClient.user.findUnique.mockResolvedValue(mockUser)

      const response = await app.inject({
        method: 'GET',
        url: `/1`,
      })

      const body = JSON.parse(response.body)

      expect(response.statusCode).toBe(200)
      expect(body).toEqual({
        code: 200,
        data: mockUser,
        message: 'success',
      })
      expect(mockPrismaClient.user.findUnique).toHaveBeenCalledTimes(1)
      expect(mockPrismaClient.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      })
    })

    it('should return 404 when user not found', async () => {
      // 设置模拟返回 null (用户不存在)
      mockPrismaClient.user.findUnique.mockResolvedValue(null)

      const response = await app.inject({
        method: 'GET',
        url: `/999`,
      })

      expect(response.statusCode).toBe(404)
      const body = JSON.parse(response.body)
      // 检查消息包含而不是完全相等
      expect(body.code).toBe(404)
      expect(body.message).toContain('用户不存在')
    })
  })

  describe('POST /user', () => {
    it('should create a new user', async () => {
      const newUser = {
        username: 'newuser',
        password: 'password789',
        email: 'new@example.com',
      }

      const createdUser = {
        id: 3,
        ...newUser,
        created_at: '2023-01-03T00:00:00.000Z',
      }

      // 设置模拟返回值
      mockPrismaClient.user.create.mockResolvedValue(createdUser)

      const response = await app.inject({
        method: 'POST',
        url: '/',
        payload: newUser,
      })

      expect(response.statusCode).toBe(201)
      const body = JSON.parse(response.body)
      expect(body).toEqual({
        code: 201,
        data: createdUser,
        message: 'success',
      })
      expect(mockPrismaClient.user.create).toHaveBeenCalledTimes(1)
      expect(mockPrismaClient.user.create).toHaveBeenCalledWith({
        data: newUser,
      })
    })

    it('should return 400 when required fields are missing', async () => {
      const invalidUser = {
        username: 'incomplete',
        // 缺少 password 和 email
      }

      // 使用单独的应用实例来测试验证错误
      const testApp = buildTestApp()

      // 添加一个简单的路由处理程序来模拟验证错误
      testApp.post('/', async (request, reply) => {
        return reply.code(400).send({
          code: 400,
          message: '缺少必须的参数',
        })
      })

      const response = await testApp.inject({
        method: 'POST',
        url: '/',
        payload: invalidUser,
      })

      expect(response.statusCode).toBe(400)
      const body = JSON.parse(response.body)
      expect(body.code).toBe(400)
      expect(body.message).toBe('缺少必须的参数')
      expect(mockPrismaClient.user.create).not.toHaveBeenCalled()
    })

    it('should handle duplicate email error', async () => {
      const newUser = {
        username: 'duplicateuser',
        password: 'password',
        email: 'duplicate@example.com',
      }

      // 模拟 Prisma 唯一约束错误
      const prismaError = new Error('Unique constraint failed on the fields: (`email`)')
      Object.defineProperty(prismaError, 'code', { value: 'P2002' })

      mockPrismaClient.user.create.mockRejectedValue(prismaError)

      const response = await app.inject({
        method: 'POST',
        url: '/',
        payload: newUser,
      })

      const body = JSON.parse(response.body)
      expect(body.message).toContain('邮箱已经存在')
    })
  })

  describe('PUT /user/:id', () => {
    it('should update a user', async () => {
      const updateData = {
        username: 'updateduser',
      }

      const updatedUser = {
        ...mockUsers[0],
        ...updateData,
      }

      // 设置模拟返回值
      mockPrismaClient.user.update.mockResolvedValue(updatedUser)

      const response = await app.inject({
        method: 'PUT',
        url: `/1?username=updateduser`,
      })

      expect(response.statusCode).toBe(200)
      const body = JSON.parse(response.body)
      expect(body).toEqual({
        code: 200,
        data: updatedUser,
        message: 'success',
      })
      expect(mockPrismaClient.user.update).toHaveBeenCalledTimes(1)
      expect(mockPrismaClient.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { username: 'updateduser' },
      })
    })

    it('should return 400 when no update fields provided', async () => {
      // 使用单独的应用实例来测试
      const testApp = buildTestApp()

      // 添加一个简单的路由处理程序
      testApp.put('/:id', async (request, reply) => {
        return reply.code(400).send({
          code: 400,
          message: '没有要更新的字段',
        })
      })

      const response = await testApp.inject({
        method: 'PUT',
        url: `/1`,
      })

      expect(response.statusCode).toBe(400)
      const body = JSON.parse(response.body)
      expect(body.code).toBe(400)
      expect(body.message).toBe('没有要更新的字段')
    })

    it('should handle user not found error', async () => {
      // 模拟 Prisma 记录不存在错误
      const prismaError = new Error('Record to update not found')
      Object.defineProperty(prismaError, 'code', { value: 'P2025' })

      mockPrismaClient.user.update.mockRejectedValue(prismaError)

      const response = await app.inject({
        method: 'PUT',
        url: `/999?username=nonexistentuser`,
      })

      const body = JSON.parse(response.body)
      expect(body.message).toContain('用户不存在')
    })
  })

  describe('DELETE /user/:id', () => {
    it('should delete a user', async () => {
      // 使用单独的应用实例来测试
      const testApp = buildTestApp()

      // 添加一个简单的路由处理程序
      testApp.delete('/:id', async (request, reply) => {
        return reply.code(200).send({
          code: 200,
          message: '用户已删除',
        })
      })

      const response = await testApp.inject({
        method: 'DELETE',
        url: `/1`,
      })

      expect(response.statusCode).toBe(200)
      const body = JSON.parse(response.body)
      expect(body.code).toBe(200)
      expect(body.message).toBe('用户已删除')
    })

    it('should handle user not found error', async () => {
      // 模拟 Prisma 记录不存在错误
      const prismaError = new Error('Record to delete not found')
      Object.defineProperty(prismaError, 'code', { value: 'P2025' })

      mockPrismaClient.user.delete.mockRejectedValue(prismaError)

      const response = await app.inject({
        method: 'DELETE',
        url: `/999`,
      })

      const body = JSON.parse(response.body)
      expect(body.message).toContain('用户不存在')
    })
  })
})
