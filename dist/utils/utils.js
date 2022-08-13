"use strict";
exports.__esModule = true;
exports.readFile = void 0;
var fs = require("fs");
function readFile(filePath) {
    return fs.readFileSync(filePath).toString();
}
exports.readFile = readFile;
