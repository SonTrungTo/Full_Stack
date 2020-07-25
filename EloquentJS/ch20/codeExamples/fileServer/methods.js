const {urlPath} = require("./urlPath");

const {createReadStream} = require("fs");
const {readdir, stat} = require("fs").promises;

const mime = require("mime");

const methods = Object.create(null);

methods.GET = async function(request) {
  let path;
}
