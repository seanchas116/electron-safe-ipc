var path = require("path");
var app = require("app");
var BrowserWindow = require("browser-window");
var Mocha = require("mocha");

app.on("ready", function () {
  var mainWindow = new BrowserWindow({
    width: 100,
    height: 100,
    //show: false,
    "node-integration": false,
  });
  mainWindow.loadUrl("file://" + __dirname + "/index.html");

  var mocha = new Mocha();
  mocha.addFile(path.join(__dirname, "test/test.js"));
  mocha.run(function (failures) {
    // TODO: return status
    app.quit();
  });
});
