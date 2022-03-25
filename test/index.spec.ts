import { expect } from 'aegir/utils/chai.js'
import { WebRTCInitiator, WebRTCReceiver, WRTC } from '../src/index.js'
import { isBrowser } from 'wherearewe'
import { pEvent } from 'p-event'
import { getWrtc } from './utils.js'
import delay from 'delay'
import { pipe } from 'it-pipe'
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import pDefer from 'p-defer'
import first from 'it-first'

describe('@libp2p/webrtc-peer', () => {
  let wrtc: WRTC | undefined
  let initiator: WebRTCInitiator
  let receiver: WebRTCReceiver

  before(async () => {
    wrtc = await getWrtc()
  })

  afterEach(async () => {
    if (initiator != null) {
      await initiator.close()
    }

    if (receiver != null) {
      await receiver.close()
    }
  })

  it('should have WebRTC support', () => {
    if (isBrowser) {
      expect(new WebRTCInitiator()).to.have.property('wrtc').that.is.ok()
      expect(new WebRTCReceiver()).to.have.property('wrtc').that.is.ok()
    } else {
      expect(() => new WebRTCInitiator()).to.throw(/No WebRTC support detected/)
      expect(() => new WebRTCReceiver()).to.throw(/No WebRTC support detected/)
    }
  })

  it('should emit signal event', async () => {
    initiator = new WebRTCInitiator({
      wrtc
    })

    await pEvent(initiator, 'signal')
  })

  it('signal event does not get emitted by non-initiator', async () => {
    receiver = new WebRTCReceiver({
      wrtc
    })

    await Promise.race([
      pEvent(receiver, 'signal').then(() => {
        expect.fail('Should not have emitted signal event')
      }),
      delay(1000)
    ])
  })

  it('sends/receives data', async () => {
    const initiator = new WebRTCInitiator({
      wrtc,
      peerConnectionConfig: {
        iceServers: []
      }
    })
    const receiver = new WebRTCReceiver({
      wrtc,
      peerConnectionConfig: {
        iceServers: []
      }
    })

    let initiatorSignals = 0
    initiator.addEventListener('signal', (event) => {
      initiatorSignals++
      receiver.handleSignal(event.detail)
    })

    let receiverSignals = 0
    receiver.addEventListener('signal', (event) => {
      receiverSignals++
      initiator.handleSignal(event.detail)
    })

    await Promise.all([
      pEvent(initiator, 'ready'),
      pEvent(receiver, 'ready')
    ])

    expect(initiatorSignals).to.be.greaterThan(0)
    expect(receiverSignals).to.be.greaterThan(0)

    const initiatorReceivedData = pDefer()
    const recipientReceivedData = pDefer()

    const [
      initiatorData,
      receiverData
    ] = await Promise.all([
      pipe(
        async function * () {
          yield uint8ArrayFromString('sup receiver')
          await initiatorReceivedData.promise
        },
        initiator,
        async (source) => {
          const buf = await first(source)

          if (buf == null) {
            throw new Error('Did not receive output')
          }

          initiatorReceivedData.resolve()

          return buf
        }
      ),
      pipe(
        async function * () {
          yield uint8ArrayFromString('sup initiator')
          await recipientReceivedData.promise
        },
        receiver,
        async (source) => {
          const buf = await first(source)

          if (buf == null) {
            throw new Error('Did not receive output')
          }

          recipientReceivedData.resolve()

          return buf
        }
      )
    ])

    expect(initiatorData).to.equalBytes(uint8ArrayFromString('sup initiator'))
    expect(receiverData).to.equalBytes(uint8ArrayFromString('sup receiver'))

    const intiatorClose = pEvent(initiator, 'close')
    const receiverClose = pEvent(receiver, 'close')

    await initiator.close()
    await receiver.close()

    await Promise.all([
      intiatorClose,
      receiverClose
    ])
  })

  it('sends/receives data with single-message handshake', async () => {
    const initiator = new WebRTCInitiator({
      wrtc,
      peerConnectionConfig: {
        iceServers: []
      }
    })
    const receiver = new WebRTCReceiver({
      wrtc,
      peerConnectionConfig: {
        iceServers: []
      }
    })

    let initiatorSignals = 0
    initiator.addEventListener('signal', (event) => {
      if (event.detail.type !== 'offer') {
        return
      }

      initiatorSignals++
      receiver.handleSignal(event.detail)
    })

    let receiverSignals = 0
    receiver.addEventListener('signal', (event) => {
      if (event.detail.type !== 'answer') {
        return
      }

      receiverSignals++
      initiator.handleSignal(event.detail)
    })

    await Promise.all([
      pEvent(initiator, 'ready'),
      pEvent(receiver, 'ready')
    ])

    expect(initiatorSignals).to.equal(1)
    expect(receiverSignals).to.equal(1)

    const initiatorReceivedData = pDefer()
    const recipientReceivedData = pDefer()

    const [
      initiatorData,
      receiverData
    ] = await Promise.all([
      pipe(
        async function * () {
          yield uint8ArrayFromString('sup receiver')
          await initiatorReceivedData.promise
        },
        initiator,
        async (source) => {
          const buf = await first(source)

          if (buf == null) {
            throw new Error('Did not receive output')
          }

          initiatorReceivedData.resolve()

          return buf
        }
      ),
      pipe(
        async function * () {
          yield uint8ArrayFromString('sup initiator')
          await recipientReceivedData.promise
        },
        receiver,
        async (source) => {
          const buf = await first(source)

          if (buf == null) {
            throw new Error('Did not receive output')
          }

          recipientReceivedData.resolve()

          return buf
        }
      )
    ])

    expect(initiatorData).to.equalBytes(uint8ArrayFromString('sup initiator'))
    expect(receiverData).to.equalBytes(uint8ArrayFromString('sup receiver'))

    const intiatorClose = pEvent(initiator, 'close')
    const receiverClose = pEvent(receiver, 'close')

    await initiator.close()
    await receiver.close()

    await Promise.all([
      intiatorClose,
      receiverClose
    ])
  })
})
