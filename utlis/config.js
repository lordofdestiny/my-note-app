const { COOKIE_SECRET, PORT } = process.env;

module.exports = {
  secret: COOKIE_SECRET,
  port: PORT
};
