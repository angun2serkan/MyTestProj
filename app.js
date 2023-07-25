const http = require("http");
const port = 8001;

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 200;
    res.write("<h1>Home Page</h1>");
    res.end;
  } else if (req.url == "/about") {
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 200;
    res.write("<h1>About Page</h1>");
    res.end;
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>404 Page Not Found</h1>");
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
