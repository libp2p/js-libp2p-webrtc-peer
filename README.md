# ⚠️⚠️⚠️⚠️⚠️⚠️ <!-- omit in toc -->
**Status:**

[Archived](https://github.com/libp2p/github-mgmt/pull/80) and not maintained

**Alternatives:**

WebRTC Browser-to-Server is being implemented in js-libp2p and tracked here https://github.com/libp2p/js-libp2p/issues/1478 per the specification: https://github.com/libp2p/specs/pull/412

WebRTC Browser-to-Browser is being tracked here: https://github.com/libp2p/js-libp2p/issues/1462

**Questions:**

Please direct any questions about the specification to: https://github.com/libp2p/specs/issues

Please direct any questions about the js-libp2p WebRTC implementations to:
https://github.com/libp2p/js-libp2p/issues/1478 or
https://github.com/libp2p/js-libp2p/issues/1462
# ⚠️⚠️⚠️⚠️⚠️⚠️  <!-- omit in toc -->

# @libp2p/webrtc-peer <!-- omit in toc -->

[![libp2p.io](https://img.shields.io/badge/project-libp2p-yellow.svg?style=flat-square)](http://libp2p.io/)
[![Discuss](https://img.shields.io/discourse/https/discuss.libp2p.io/posts.svg?style=flat-square)](https://discuss.libp2p.io)
[![codecov](https://img.shields.io/codecov/c/github/libp2p/js-libp2p-webrtc-peer.svg?style=flat-square)](https://codecov.io/gh/libp2p/js-libp2p-webrtc-peer)
[![CI](https://img.shields.io/github/workflow/status/libp2p/js-libp2p-webrtc-peer/test%20&%20maybe%20release/master?style=flat-square)](https://github.com/libp2p/js-libp2p-webrtc-peer/actions/workflows/js-test-and-release.yml)

> Simple one-to-one WebRTC data channels

## Table of contents <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
- [License](#license)
- [Contribute](#contribute)

## Install

```console
$ npm i @libp2p/webrtc-peer
```

## Usage

```js
import { WebRTCInitiator } from '@libp2p/webrtc-peer'

const channel = new WebRTCInitiator(channelOptions)
channel.addEventListener('signal', (signal) => {
  // do handshake
})
```

## License

Licensed under either of

- Apache 2.0, ([LICENSE-APACHE](LICENSE-APACHE) / <http://www.apache.org/licenses/LICENSE-2.0>)
- MIT ([LICENSE-MIT](LICENSE-MIT) / <http://opensource.org/licenses/MIT>)

## Contribute

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.
