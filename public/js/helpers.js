String.prototype.toTitleCase = function() {
  return this.split(" ")
    .map(word => {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(" ");
};

Handlebars.registerHelper("str", (...strings) => {
  return strings.slice(0, -1).join(" ");
});

Handlebars.registerHelper("log", data => {
  console.log(data);
  return null;
});

Handlebars.registerHelper("timeBetween", date => {
  return moment()
    .to(date)
    .toTitleCase();
});

Handlebars.registerHelper("momentIt", (date, format) => {
  return moment(date).format(format);
});
