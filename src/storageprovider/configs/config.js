require("dotenv").config();

module.exports = {
  FOLDER: process.env.FOLDER,
  CLEANUP_THRESHOLD: process.env.CLEANUP_THRESHOLD,
};
