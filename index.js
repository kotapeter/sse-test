const http = require('http')
const url = require('node:url');
const port = 8080;

function sseStart(res) {
  res.writeHead(200, {
    'Content-Type': "text/event-stream",
    'Cache-Control': "no-cache",
    Connection: "keep-alive"
  });
}

function sseRandom(res) {
  res.write("data: " + (Math.floor(Math.random() * 1000) + 1) + "\n\n");
  setTimeout(() => sseRandom(res), Math.random() * 1000);
}

http.createServer(async (req, res) => {

  // get URI path
  const uri = url.parse(req.url).pathname;

  // return response
  switch (uri) {
  case "/random":
    sseStart(res);
    sseRandom(res);
    break;
  }

}).listen(port);

console.log(`server running: http://localhost:${port}\n\n`);