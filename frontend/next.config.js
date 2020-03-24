require("dotenv").config();

module.exports = {
  env: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    BACKEND_DOMAIN: process.env.BACKEND_DOMAIN
  }
};
