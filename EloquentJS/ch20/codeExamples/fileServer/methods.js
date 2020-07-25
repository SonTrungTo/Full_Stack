const {urlPath} = require("./urlPath");

const {createReadStream}  = require("fs");
const {createWriteStream} = require("fs");
const {readdir, stat} = require("fs").promises;
const {rmdir, unlink} = require("fs").promises;
const {mkdir}         = require("fs").promises;

const mime = require("mime");

const methods = Object.create(null);

methods.GET = async function(request) {
  let path = urlPath(request.url);
  let stats;

  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code != "ENOENT") throw error;
    else return {body: "File not found", status: 404};
  }
  if (stats.isDirectory()) {
    return {body: (await readdir(path)).join("\n")};
  } else {
    return {
      body: createReadStream(path),
      type: mime.getType(path)
    };
  }
}

methods.DELETE = async function(request) { // idempotent
  let path = urlPath(request.url);
  let stats;

  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code != "ENOENT") throw error;
    else return {status: 204};
  }
  if (stats.isDirectory()) await rmdir(path);
  else await unlink(path);
  return {status: 204};
}

methods.PUT = async function(request) {
  let path = urlPath(request.url);
  await pipeStream(request, createWriteStream(path));
  return {status: 204};
}

async function pipeStream(from, to) {
  return new Promise((resolve, reject) => {
    from.on("error", reject);
    to.on("error", reject);
    to.on("finish", resolve);
    from.pipe(to);
  });
}

methods.MKCOL = async function(request) {
  let path = urlPath(request.url);
  await mkdir(path);
  return {status: 204};
}

exports.methods = methods;
