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
  'error': CustomEvent<Error>
}

export { WebRTCReceiver } from './receiver.js'
export { WebRTCInitiator } from './initiator.js'

export interface WebRTCPeerInit {
  id?: string
  wrtc?: WRTC
  peerConnectionConfig?: RTCConfiguration
}

export interface WebRTCReceiverInit extends WebRTCPeerInit {
  answerOptions?: RTCAnswerOptions
}

export interface WebRTCInitiatorInit extends WebRTCPeerInit {
  dataChannelLabel?: string
  dataChannelInit?: RTCDataChannelInit
  offerOptions?: RTCOfferOptions
}
