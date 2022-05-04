import { isBrowser } from 'wherearewe'
import type { WRTC } from '../src/index.js'

export async function getWrtc (): Promise<WRTC | undefined> {
  if (isBrowser) {
    return undefined
  }

  // @ts-expect-error wrtc has no types
  const wrtc = await import('wrtc')

  return {
    RTCPeerConnection: wrtc.default.RTCPeerConnection,
    RTCSessionDescription: wrtc.default.RTCSessionDescription,
    RTCIceCandidate: wrtc.default.RTCIceCandidate
  }
}
