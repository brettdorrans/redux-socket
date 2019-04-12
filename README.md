# redux-socket

[![GitHub Release](https://img.shields.io/github/release/brettdorrans/redux-socket.svg?style=flat)](https://github.com/brettdorrans/redux-socket/releases)
[![GitHub Issues](https://img.shields.io/github/issues/brettdorrans/redux-socket.svg?style=flat)](https://github.com/brettdorrans/redux-socket/issues)
[![Dependencies](https://david-dm.org/brettdorrans/redux-socket/status.svg?style=flat)](https://david-dm.org/brettdorrans/redux-socket)
[![Dev Dependencies](https://david-dm.org/brettdorrans/redux-socket/dev-status.svg)](https://david-dm.org/brettdorrans/redux-socket?type=dev)
[![Build Status](https://travis-ci.org/brettdorrans/redux-socket.svg?branch=master)](https://travis-ci.org/brettdorrans/redux-socket)

[redux-socket](https://brettdorrans.github.io/redux-socket/): A middleware for connecting redux and socket.io

## Quickstart
```bash
➜ npm install --save @lapidist/redux-socket
```

### Example Usage
Client side:
```js
import { createStore, applyMiddleware } from 'redux';
import createSocketMiddleware from '@lapidist/redux-socket';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');
const socketMiddleware = createSocketMiddleware(socket, 'server/');
const store = applyMiddleware(socketMiddleware)(createStore);

store.dispatch({
    payload: 'hello',
    type: 'server/hello'
});
```

Server side:
```js
import http from 'http';
import socketIO from 'socket.io';

const server = http.createServer();
const io = socketIO();

server.listen(3000);
io.attach(server);

io.on('connection', socket => {
    socket.on('action', action => {
        switch (action.type) {
            case 'server/hello':
                socket.emit('action', {
                    payload: 'world',
                    type: 'server/world'
                });
                break;
        }
    });
});
```

## Development

Clone repository into a directory:
```bash
➜ git clone https://github.com/brettdorrans/safestart.git
```

Install dependencies:
```bash
➜ npm i
```

Find more information about `package.json` scripts:
```bash
➜ npm run info
```
```
info:
  Display information about the package scripts
build:
  Clean and rebuild the project
fix:
  Try to automatically fix any linting problems
test:
  Lint and unit test the project
watch:
  Watch and rebuild the project on save, then rerun relevant tests
cov:
  Rebuild, run tests, then create and open the coverage report
doc:
  Generate HTML API documentation and open it in a browser
version:
  Bump package.json version, update CHANGELOG.md, tag release
reset:
  Delete all untracked files and reset the repo to the last commit
prepare-release:
  One-step: clean, build, test, publish docs, and prep a release
```

Additional build tasks can be found in `package.json`.

## Credits and collaboration
`redux-socket` is maintained by [Brett Dorrans](https://github.com/brettdorrans). I welcome comments, feedback and suggestions. Please feel free to raise an issue or pull request.

## License
`redux-socket` is licensed under the MIT license. See LICENSE for the full text.