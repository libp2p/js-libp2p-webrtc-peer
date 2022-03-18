# js-libp2p-webrtc-peer <!-- omit in toc -->

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](http://ipn.io)
[![](https://img.shields.io/badge/project-libp2p-yellow.svg?style=flat-square)](http://libp2p.io/)
[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)
[![Discourse posts](https://img.shields.io/discourse/https/discuss.libp2p.io/posts.svg)](https://discuss.libp2p.io)
[![Coverage Status](https://coveralls.io/repos/github/libp2p/js-libp2p-webrtc-peer/badge.svg?branch=master)](https://coveralls.io/github/libp2p/js-libp2p-webrtc-peer?branch=master)
[![Build Status](https://github.com/libp2p/js-libp2p-webrtc-peer/actions/workflows/js-test-and-release.yml/badge.svg?branch=main)](https://github.com/libp2p/js-libp2p-webrtc-peer/actions/workflows/js-test-and-release.yml)
[![Dependency Status](https://david-dm.org/libp2p/js-libp2p-webrtc-peer.svg?style=flat-square)](https://david-dm.org/libp2p/js-libp2p-webrtc-peer)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
![](https://img.shields.io/badge/Node.js-%3E%3D14.0.0-orange.svg?style=flat-square)

[![](https://raw.githubusercontent.com/libp2p/interface-transport/master/img/badge.png)](https://github.com/libp2p/interface-transport)
[![](https://raw.githubusercontent.com/libp2p/interface-connection/master/img/badge.png)](https://github.com/libp2p/interface-connection)

> Simple one-to-one WebRTC data channels

## Table of Contents <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
- [License](#license)
  - [Contribution](#contribution)

## Install

```sh
> npm i @libp2p/webrtc-peer
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

 * Apache 2.0, ([LICENSE-APACHE](LICENSE-APACHE) / http://www.apache.org/licenses/LICENSE-2.0)
 * MIT ([LICENSE-MIT](LICENSE-MIT) / http://opensource.org/licenses/MIT)

### Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.
