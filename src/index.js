// importing dependencies
const config = require("./fileserver/configs/config");
const express = require("express");
const bodyParser = require("body-parser");
const {
  storageCleanup,
} = require("./storageprovider/controllers/localfilesystem");

// this handles routes
const filesRouter = require("./fileserver/routes/files");

const app = express();
const PORT = config.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});

app.use(bodyParser.json());
app.use("/api/files", filesRouter);

// storage cleanup mechanism
setInterval(storageCleanup, config.CLEANUP_JOB_INTERVAL * 1000 * 60);

module.exports = app;
