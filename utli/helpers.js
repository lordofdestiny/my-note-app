String.prototype.toTitleCase = function() {
  return this.split(" ")
    .map(word => {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(" ");
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
  flashToError
};
