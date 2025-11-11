const http = require("http");

const server = http.createServer((request, response) => {
  // logic
  response.statusCode = 200;
  response.setHeader("Content-Type", "text/html");

  const method = request.method;
  const url = request.url;

  if (url === "/" && method === "GET") {
    response.end(JSON.stringify({ msg: "Iam from Home Page" }));
  } else if (url === "/about" && method === "GET") {
    response.end(JSON.stringify({ msg: "Iam from About Page" }));
  } else if (url === "/contact" && method === "GET") {
    response.end(JSON.stringify({ msg: "Iam from Contact Page" }));
  }
});

const hostname = "127.0.0.1";
const port = 5000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
