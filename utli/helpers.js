function toTitleCase(str) {
  return str.length == 0
    ? ""
    : str
        .split(" ")
        .map(word => word[0].toUpperCase() + word.substr(1))
        .join(" ");
}

String.prototype.toTitleCase = function() {
  return toTitleCase(this);
};

const flashToError = str => {
  if (str.length == 0) return null;
  [error, username] = str[0].split("-");
  return {
    error,
    username
  };
};

module.exports = {
  flashToError,
  toTitleCase
};
