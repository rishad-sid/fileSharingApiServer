const { copyFileSync } = require("fs");
const DB = require("../../../src/fileserver/data/db.json");
const { saveToDatabase } = require("../../../src/fileserver/data/utils");
const config = require("../../../src/storageprovider/configs/config");

const fileData = {
  originalname: "meldCX code test.pdf",
  mimetype: "application/pdf",
  destination: `${config.FOLDER}`,
  filename: "file-0123456789.pdf",
  path: `${config.FOLDER}/file-0123456789.pdf`,
  privatekey: "cd8f23c9-74c5-4df2-bd67-93154073c975",
  publickey: "7b7fc110-9b41-4016-adac-326c69933391",
  createdat: Date.now(),
  updatedat: Date.now(),
};

const addDummyFile = () => {
  DB.files.push(fileData);
  saveToDatabase(DB);
};

const copyDummyFile = () => {
  copyFileSync(
    "tests/files/file-1660589701059.pdf",
    "uploads/file-1660589701059.pdf"
  );
};

module.exports = {
  addDummyFile,
  copyDummyFile,
};
