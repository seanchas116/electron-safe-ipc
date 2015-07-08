electron-safe-ipc [![npm version](https://badge.fury.io/js/electron-safe-ipc.svg)](http://badge.fury.io/js/electron-safe-ipc)
================

electron-safe-ipc is a safe communication library between the main process and renderer processes in Electron.

"Safe" means:

* Works even when `node-integration` == `false` in renderer processes
* Works without JS object instance sharing

It uses:

* JSON to pack data
* Electron `protocol` to send message to main process
* Electron `WebContents.executeJavaScript` to send message to renderer process

Used in [Wantedly, Inc.](https://www.wantedly.com/)

Install
----------------

```
npm install --save electron-safe-ipc
```

Use
----------------

### Main process

```js
var ipc = require("electron-safe-ipc/main");

ipc.on("fromRenderer", function (a, b) {
  console.log("fromRenderer received", a, b);
});
ipc.send("fromMain", 1, 2);
```

### Renderer process

If "node-integration" is disabled, use bundling tools (e.g., browserify).

```js
var ipc = require("electron-safe-ipc/renderer");

ipc.on("fromMain", function (a, b) {
  ipc.send("fromRenderer", a, b);
});
```

API
----------------

`ipc` is an `EventEmitter`.

### `ipc.send(channel, ...args)`

Send a message between processes.

The arguments are packed into JSON.

The message is sent to all renderer processes when you call this from the main process.

### `ipc.on(channel, callback)`

Receive messages.

Other `EventEmitter` methods can also be used to listen to messages.
