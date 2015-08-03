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

#### Node style

If `"node-integration"` is disabled, use bundling tools (e.g., [browserify](http://browserify.org/)).

```js
var ipc = require("electron-safe-ipc/renderer");

ipc.on("fromMain", function (a, b) {
  ipc.send("fromRenderer", a, b);
});
```

#### Traditional style (UMD)

```html
<script src="path/to/node_modules/electron-safe-ipc/renderer-bundle.js"></script>
<script>
  electronSafeIpc.on("fromMain", function (a1, a2) {
    electronSafeIpc.send("fromRenderer", a1, a2);
  });
</script>
```

### Use main-side ipc in renderer process

You can use main-side `ipc` in renderer processes with `remote.require`.
This is useful for communication between Node enabled renderer processes and Node disabled `<webview>`.

```js
var remote = require("remote");
var ipc = remote.require("electron-safe-ipc/main");

ipc.on("fromRenderer", function (a, b) {
  console.log("fromRenderer received", a, b);
});
ipc.send("fromMain", 1, 2);
```

API
----------------

`ipc` is an [`EventEmitter`](https://nodejs.org/api/events.html#events_class_events_eventemitter).

### `ipc.send(channel, ...args)`

Send a message between processes.

The arguments are packed into JSON.

The message is sent to all renderer processes when you call this from the main process.

### `ipc.on(channel, callback)`

Receive messages.

Other `EventEmitter` methods can also be used to listen to messages.
