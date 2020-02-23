const http = require("http");
const config = require("./utlis/config");
const app = require("./app.js");

const port = config.port || 3000;

const server = http.createServer(app);

server.listen(port, () => console.log(`Server listening on port ${port}`));
