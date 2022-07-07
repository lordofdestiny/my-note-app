function toTitleCase(str) {
  return str.length == 0
    ? ""
    : str
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.substr(1))
        .join(" ");
}

const buildErrorArray = (error) => Object.keys(error).map((key) => error[key]);

if (!String.prototype.toTitleCase) {
  String.prototype.toTitleCase = function () {
    return toTitleCase(this);
  };
}

const buildMongoDBConnectionURI = (connectionDetails) => {
  let { username, password, host, port, name } = connectionDetails;
  const authority =
    username == "" || password == "" ? "" : `${username}:${password}@`;
  return `mongodb://${authority}${host}:${port}/${name}`;
};

module.exports = {
  toTitleCase,
  buildErrorArray,
  buildMongoDBConnectionURI,
};
