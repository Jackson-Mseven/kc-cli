// 模拟 src/utils/prisma/buildError.ts 的功能

interface ErrorResponse {
  code: number
  data: {
    error: string
    message: string
  }
}

export default function buildError(
  code: string,
  customData?: { message?: string }
): ErrorResponse | null {
  switch (code) {
    case 'P2002': // 唯一约束错误
      return {
        code: 409,
        data: {
          error: 'Conflict',
          message: customData?.message || '资源已存在',
        },
      }
    case 'P2025': // 记录不存在
      return {
        code: 404,
        data: {
          error: 'Not Found',
          message: customData?.message || '资源不存在',
        },
      }
    default:
      return null
  }
}
