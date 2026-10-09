/**
 * ICE 服务器配置。
 * 默认为空：同一局域网内依靠主机候选地址直连，无需 STUN/TURN。
 * 跨网段或经过 NAT 时，通过环境变量 NUXT_PUBLIC_ICE_SERVERS 注入，例如：
 * NUXT_PUBLIC_ICE_SERVERS='[{"urls":"stun:10.0.0.5:3478"},{"urls":"turn:10.0.0.5:3478","username":"u","credential":"p"}]'
 */
export function getIceServers(): RTCIceServer[] {
  const raw = useRuntimeConfig().public.iceServers as unknown
  if (Array.isArray(raw)) {
    return raw as RTCIceServer[]
  }
  if (typeof raw === 'string' && raw.trim()) {
    try {
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : []
    } catch (e) {
      console.warn('Invalid NUXT_PUBLIC_ICE_SERVERS', e)
    }
  }
  return []
}
