var app = require("app");
var BrowserWindow = require("browser-window");

app.on("ready", function () {
  var mainWindow = new BrowserWindow({
    width: 100,
    height: 100,
    //show: false,
    "node-integration": false,
  });
  mainWindow.loadUrl("file://" + __dirname + "/index.html");
});
