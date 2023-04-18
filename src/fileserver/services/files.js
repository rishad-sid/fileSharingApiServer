// importing the dependencies
const { v4: uuid } = require("uuid");
const files = require("../data/files");

/**
 * @param  {object} fileData
 * stores new file information
 */
const uploadNewFile = (fileData) => {
  const newFileData = {
    ...fileData,
    privatekey: uuid(),
    publickey: uuid(),
    createdat: Date.now(),
    updatedat: Date.now(),
  };
  try {
    return files.uploadNewFile(newFileData);
  } catch (error) {
    throw error;
  }
};

/**
 * @param  {string} publicKey
 * fetches the file information
 */
const downloadFile = (publicKey) => {
  try {
    return files.downloadFile(publicKey);
  } catch (error) {
    throw error;
  }
};

/**
 * @param  {string} privateKey
 * fetches the file information to be deleted
 */
const getFileToDelete = (privateKey) => {
  try {
    return files.getFileToDelete(privateKey);
  } catch (error) {
    throw error;
  }
};

/**
 * @param  {string} privateKey
 * deletes a file with the private key
 */
const deleteFile = (privateKey) => {
  try {
    return files.deleteFile(privateKey);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  uploadNewFile,
  downloadFile,
  getFileToDelete,
  deleteFile,
};
