const http = require("http");
const app = require("./app.js");

require("dotenv").config();

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => console.log(`Server listening on port ${port}`));
