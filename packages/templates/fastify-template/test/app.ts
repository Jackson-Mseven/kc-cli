import Fastify from 'fastify'
import { logger } from '../src/constants/logger'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

// 创建一个测试专用的 Fastify 实例
const app = Fastify({
  logger: {
    ...logger,
    level: 'silent', // 在测试中静默日志输出
  },
})

// 设置基本配置
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// 注册路由
app.register(import('../src/routes/user'))

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

export default app
