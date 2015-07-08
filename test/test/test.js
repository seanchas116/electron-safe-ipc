"use strict";

var assert = require("chai").assert;
var mainWindow = require("../mainWindow");

describe("mainWindow title", function () {
  it("is Test", function () {
    assert.equal(mainWindow.getTitle(), "Title");
  });
});
