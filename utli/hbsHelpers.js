require("./helpers");

const serialize = obj => {
  return Object.keys(obj).reduce((acc, key) => {
    if (key != "_id") acc.push([key, obj[key]]);
    return acc;
  }, []);
};

const concat = (...strings) => {
  return strings.slice(0, -1).join("");
};

const title = () => {
  return "My Notes App";
};

const navbarLink = (name, path, active) => {
  return `<li class="nav-button nav-item">
  <a class="nav-link ${
    active === path ? "active" : ""
  } btn btn-primary" href="${path ? path : "#"}">
    ${name}${active ? `<span class="sr-only">(current)</span>` : ""}
  </a></li>`;
};

const name = user => {
  const { first_name, last_name } = user;
  return `${first_name} ${last_name}`.toTitleCase();
};

const alert = value => {
  console.log(value);
};

const build_title = (title, titleExtend) => {
  return title + (titleExtend ? " | " + titleExtend : "");
};

module.exports = {
  serialize,
  concat,
  title,
  navbarLink,
  name,
  alert,
  build_title
};
