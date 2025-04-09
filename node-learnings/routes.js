const fs = require("fs");

const requestHandler = (req, res) => {
  if (req.url === "/") {
    res.write("<html>");
    res.write("<head>Enter message</head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name = "message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (req.url === "/message" && req.method === "POST") {
    const body = [];
    req.on("data", (chunck) => {
      console.log(chunck);
      body.push(chunck);
    });
    req.on("end", () => {
      const message = Buffer.concat(body).toString();
      console.log(message);
      fs.writeFileSync("message.txt", message);
    });
    fs.writeFileSync("message.txt", "This is some dummy text");
    (res.statusCode = 302), res.setHeader("Location", "/");
    return res.end();
  }

  res.write("<html>");
  res.write("<head>Hello !</head>");
  res.write("<body>from Nodejs</body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;

// tsc --init