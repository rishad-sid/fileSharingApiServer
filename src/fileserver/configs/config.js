require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  WINDOW_SIZE: process.env.WINDOW_SIZE,
  MAX_API_CALL: process.env.MAX_API_CALL,
  CLEANUP_JOB_INTERVAL: process.env.CLEANUP_JOB_INTERVAL,
};
