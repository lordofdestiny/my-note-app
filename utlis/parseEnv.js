// This file is not used in the project, reather a version
// of it is used in the config.js
// It is simply kept here in case some of the feauters are needed later
function fallbackDefault(val, defVal = "", convert) {
  const normalized = val === undefined ? defVal : val;
  if (convert !== undefined) {
    return convert(normalized);
  } else {
    return normalized;
  }
}

let storage = {};
let initial = true;

module.exports = {
  getENV: (refresh = false) => {
    if (initial || refresh) {
      const {
        PORT,
        DB_USERNAME,
        DB_PASSWORD,
        DB_NAME,
        DB_HOST,
        DB_DIALECT,
      } = process.env;
      storage = {
        port: fallbackDefault(PORT, 3000, Number.parseInt),
        database: {
          username: fallbackDefault(DB_USERNAME),
          password: fallbackDefault(DB_PASSWORD),
          database: fallbackDefault(DB_NAME),
          host: fallbackDefault(DB_HOST),
          dialect: fallbackDefault(DB_DIALECT),
        },
      };
      initial = false;
    }

    return storage;
  },
  isServer: () => {
    const { IS_SERVER } = process.env;
    return fallbackDefault(IS_SERVER, false, Boolean);
  },
};

// const {isServer,getENV}=require('../utils/parseEnv')

// if(!isServer()){
//   require("dotenv").config()
// }

// const {database} = getENV();

// module.exports = {
//   development: {
//     ...database
//   },
//   test: {
//     ...database
//   },
//   production: {
//     ...database
//   }
// }
