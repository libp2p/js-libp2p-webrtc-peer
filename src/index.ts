import type { Signal } from '@libp2p/webrtc-star-protocol'

export interface WRTC {
  RTCPeerConnection: typeof RTCPeerConnection
  RTCSessionDescription: typeof RTCSessionDescription
  RTCIceCandidate: typeof RTCIceCandidate
}

export interface WebRTCPeerEvents {
  'signal': CustomEvent<Signal>
  'ready': CustomEvent
  'close': CustomEvent
  'ice-candidate': CustomEvent
}

export { WebRTCReceiver } from './receiver.js'
export { WebRTCInitiator } from './initiator.js'
