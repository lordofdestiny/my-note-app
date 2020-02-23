require("./helpers");
const moment = require("moment");

const serialize = obj =>
  Object.keys(obj).reduce(
    (acc, key) => (key != "_id" ? (acc.push([key, obj[key]]), acc) : acc),
    []
  );

const concat = (...strings) => strings.slice(0, -1).join("");

const title = () => "My Notes App";

const navbarLink = (name, path, active) =>
  `<li class="nav-button nav-item">
    <a class="nav-link ${active === path ? "active" : ""}
      btn btn-primary" href="${path ? path : "#"}">
      ${name}
      ${active ? `<span class="sr-only">(current)</span>` : ""}
    </a>
  </li>`;

const name = user => `${user.first_name} ${user.last_name}`.toTitleCase();

const alert = value => {
  console.log(value);
};

const build_title = (title, titleExtend) =>
  title + (titleExtend ? " | " + titleExtend : "");

const str = (...strings) => strings.slice(0, -1).join(" ");

const timeBetween = date =>
  moment()
    .to(date)
    .toTitleCase();

const momentIt = (date, format) => moment(date).format(format);

const reverse = array => array.reverse();

const flashMessage = flash_date => {
  const time = Date.now() - flash_date.valueOf();
  if (Math.abs(time) <= 90 * 1000) return `Now`;
  if (time > 0) return `Expired ${timeBetween(flash_date)}.`;
  else if (time < 0) return `${timeBetween(flash_date)}`;
};

const shorten = text => (text.length < 100 ? text : text.substr(0, 60) + "...");

const dataSet = (...params) =>
  params.reduce((acc, value, index) => {
    if (index == params.length - 1) return acc;
    if (index % 2 == 0) {
      acc[value] = undefined;
    } else {
      acc[params[index - 1]] = value;
    }
    return acc;
  }, {});

const or = (p1, p2) => p1 || p2;

const and = (p1, p2) => p1 && p2;

const not = value => !value;

module.exports = {
  serialize,
  concat,
  title,
  navbarLink,
  name,
  alert,
  build_title,
  str,
  timeBetween,
  momentIt,
  reverse,
  flashMessage,
  shorten,
  dataSet,
  and,
  not,
  or
};
