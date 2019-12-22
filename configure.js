const fs = require("fs");
const path = require("path");
const ncp = require("ncp").ncp;

function createDir(dir) {
  let dirParts = dir.split("/");
  for (let i = 0; i < dirParts.length; i++) {
    let createDir = path.resolve(__dirname, ...dirParts.slice(0, i + 1));
    if (!fs.existsSync(createDir)) {
      fs.mkdirSync(createDir);
    }
  }
}

createDir("docs/libs");

ncp("./node_modules/html5shiv/dist", "./docs/libs/html5shiv", function(err) {
  if (err) {
    return console.error(err);
  }
  console.log("Copied: html5shiv");
});

ncp("./node_modules/base64-js", "./docs/libs/base64", function(err) {
  if (err) {
    return console.error(err);
  }
  console.log("Copied: base64-js");
});