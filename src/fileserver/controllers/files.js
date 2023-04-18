// importing the dependencies
const fileService = require("../services/files");

/**
 * @param  {request object} req
 * @param  {response object} res
 * uploads a new file
 */
const uploadNewFile = (req, res) => {
  const { originalname, mimetype, destination, filename, path } = req.file;

  const fileData = { originalname, mimetype, destination, filename, path };
  try {
    const uploadedFileData = fileService.uploadNewFile(fileData);
    res.status(201).send({
      status: "OK",
      data: uploadedFileData,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: {
        error: error?.message || error,
      },
    });
  }
};

/**
 * @param  {request object} req
 * @param  {response object} res
 * @param  {next object} next
 * download/loads a file
 */
const downloadFile = (req, res, next) => {
  const { publicKey } = req.params;
  try {
    const downloadedFileData = fileService.downloadFile(publicKey);
    req.downloadedFileData = downloadedFileData;
    next();
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: {
        error: error?.message || error,
      },
    });
  }
};

/**
 * @param  {request object} req
 * @param  {response object} res
 * @param  {next object} next
 * fetches the file information to be deleted
 */
const getFileToDelete = (req, res, next) => {
  const { privateKey } = req.params;
  try {
    const fileData = fileService.getFileToDelete(privateKey);
    req.fileData = fileData;
    next();
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: {
        error: error?.message || error,
      },
    });
  }
};

/**
 * @param  {request object} req
 * @param  {response object} res
 * deletes the file
 */
const deleteFile = (req, res) => {
  const { privateKey } = req.params;
  try {
    const fileData = fileService.deleteFile(privateKey);
    res.status(200).send({
      status: "OK",
      data: fileData,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: {
        error: error?.message || error,
      },
    });
  }
};

module.exports = {
  uploadNewFile,
  downloadFile,
  getFileToDelete,
  deleteFile,
};
