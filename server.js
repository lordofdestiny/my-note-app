const http = require("http");
const { getEnv, getArgs } = require("./utlis/config");

const { port: envPort } = getEnv(true);
const { port: argPort } = getArgs({ port: null });
const port = argPort ?? envPort;

const app = require("./app.js");

const server = http.createServer(app);

server.listen(port, () => console.log(`Server listening on port ${port}`));
process.addListener("beforeExit", () => require("mongoose").connection.close());
