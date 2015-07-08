"use strict";

var EventEmitter = require("events").EventEmitter;
var BrowserWindow = require("browser-window");
var protocol = require("protocol");
var arraySlice = Array.prototype.slice;
var url = require("url");
var qs = require("querystring");

var ipc = new EventEmitter();

protocol.registerProtocol("electron-safe-ipc", function (request) {
  // nextTick workaround to prevent crash on exception
  process.nextTick(function () {
    var urlContents = url.parse(request.url);
    var queries = qs.parse(urlContents.query);

    var channel = queries.channel;
    var args = JSON.parse(queries.argsJson);

    ipc.emit.apply(ipc, [channel].concat(args));
  });
  return new protocol.RequestStringJob({data: ""});
});

ipc.send = function() {
  var channel = arguments[0];
  var args = arraySlice.call(arguments, 1);

  BrowserWindow.getAllWindows().forEach(function (window) {
    var script = "window.__electronSafeIpc && window.__electronSafeIpc("
      + JSON.stringify(channel) + ","
      + JSON.stringify(JSON.stringify(args))
      + ");";
    window.webContents.executeJavaScript(script);
  });
};

module.exports = ipc;
