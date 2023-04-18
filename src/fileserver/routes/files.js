// importing the dependencies
const router = require("express").Router();
const apiLimiter = require("../middlewares/limiter");
const {
  uploadNewFile,
  downloadFile,
  getFileToDelete,
  deleteFile,
} = require("../controllers/files");
const {
  uploadFile,
  downloadOneFile,
  deleteFileFromStorage,
} = require("../../storageprovider/controllers/localfilesystem");

// setting up the router for different routes
router.post("/", apiLimiter, uploadFile, uploadNewFile);
router.get("/:publicKey", apiLimiter, downloadFile, downloadOneFile);
router.delete(
  "/:privateKey",
  getFileToDelete,
  deleteFileFromStorage,
  deleteFile
);

module.exports = router;
