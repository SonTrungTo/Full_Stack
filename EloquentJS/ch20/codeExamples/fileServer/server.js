const {createServer} = require("https");

const {methods} = require("./methods");

createServer((request, response) => {
  let handler = methods[request.method] || notAllowed;
  handler(request)
  .catch(err => {
    if (err.status != null) return err;
    return {body: String(err), status: 500};
  })
  .then(({body, status = 200, type = "text/plain"}) => {
    response.writeHead(status, {"Content-Type": type});
    if(body && body.pipe) body.pipe(response);
    else response.end(body); // null, string or buffer
  });
}).listen(8000);

async function notAllowed(request) {
  return {
    status: 405,
    body:   `Method ${request.method} is not allowed!`
  };
}
