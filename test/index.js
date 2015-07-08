"use strict";

var ipc = require("../renderer");

ipc.on("fromMain", function (a1, a2) {
  ipc.send("fromRenderer", a1, a2);
});
