const fs = require("fs");
const path = require("path");
const stringify = require("json-stringify-safe");

const newLogName = (req, dir) =>
  path.join(dir, `${Date.now()}-${req.method}-${req.path.substring(1)}.json`);

function requestLogger({ filter, stream = null }) {
  const outputLocation = path.join(__dirname, "..", "..", "requests");
  const exists = fs.existsSync(outputLocation);
  if (!exists) fs.mkdirSync(outputLocation);

  return async (req, res, next) => {
    if ((filter.length != 0 && filter.indexOf(req.path) == -1) || false)
      return next();
    console.log("Request logged!");
    const fileName = newLogName(req, outputLocation);
    const text = stringify(
      Object.assign(
        { method: req.method, url: req.originalUrl, headers: req.headers },
        {
          cookies: req.cookies,
          body: req.body,
          query: req.query,
          params: req.params
        }
      ),
      null,
      2
    );
    const outputStream = stream || fs.createWriteStream(fileName);
    await outputStream.write(text, "utf-8");
    outputStream.destroy();
    return next();
  };
}

module.exports = requestLogger;
