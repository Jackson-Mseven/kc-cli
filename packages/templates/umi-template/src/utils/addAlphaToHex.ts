export default function addAlphaToHex(hex: string, alpha: number) {
  // 移除 # 并处理缩写格式
  let cleanHex = hex.replace(/^#/, '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split('')
      .map((c) => c + c)
      .join('');
  }

  // 计算 Alpha 通道的十六进制值
  const alphaValue = Math.round(Math.min(1, Math.max(0, alpha)) * 255);
  const alphaHex = alphaValue.toString(16).padStart(2, '0');

  return `#${cleanHex}${alphaHex}`;
}
