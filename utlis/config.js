function fallbackDefault(val, defVal = "", conversion) {
  const normalized = val ?? defVal;
  const convert = conversion ?? String;
  return convert(normalized);
}

const storage = {};
let initial = true;

const getEnv = (refresh = false) => {
  if (initial || refresh) {
    const {
      PORT,
      SESSION_SECRET,
      DB_USERNAME,
      DB_PASSWORD,
      DB_HOST,
      DB_PORT,
      DB_NAME,
    } = process.env;
    Object.assign(storage, {
      port: fallbackDefault(PORT, null, Number),
      secret: fallbackDefault(SESSION_SECRET),
      database: {
        username: fallbackDefault(DB_USERNAME),
        password: fallbackDefault(DB_PASSWORD),
        host: fallbackDefault(DB_HOST, "localhost"),
        port: fallbackDefault(DB_PORT, 27017, Number),
        name: fallbackDefault(DB_NAME, "note-app"),
      },
    });
    initial = false;
  }

  return storage;
};

const getArgs = (defaults = {}) => {
  const args = process.argv.slice(2);
  const parser = /^-{0,2}(?<name>[a-z0-9]+)=(?<value>[a-z0-9]+)$/;
  const parsed = args.reduce((acc, arg) => {
    const { name, value } = parser.exec(arg).groups;
    return Object.assign(acc, { [name]: Number(value) || value });
  }, {});
  return Object.assign(defaults, parsed);
};

module.exports = {
  getEnv,
  getArgs,
};
