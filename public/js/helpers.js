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

function parseFlashDate(fd) {
  return moment(fd, "DD.MM.YYYY HH:mm").toDate();
}
