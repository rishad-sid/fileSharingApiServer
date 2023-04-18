// importing the dependencies
const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

/**
 * @param  {object} fileData
 * stores new file information in DB
 */
const uploadNewFile = (fileData) => {
  try {
    DB.files.push(fileData);
    saveToDatabase(DB);
    return {
      publicKey: fileData.publickey,
      privateKey: fileData.privatekey,
    };
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

/**
 * @param  {string} publicKey
 * fetches the file information from DB with public key
 */
const downloadFile = (publicKey) => {
  try {
    const fileData = DB.files.find((file) => file.publickey === publicKey);
    if (!fileData) {
      throw {
        status: 400,
        message: `Can't find file with public key '${publicKey}'`,
      };
    }

    const indexForUpdate = DB.files.findIndex(
      (file) => file.publickey === publicKey
    );
    const updatedFileData = {
      ...DB.files[indexForUpdate],
      updatedat: Date.now(),
    };
    DB.files[indexForUpdate] = updatedFileData;
    saveToDatabase(DB);

    const filePath = fileData.path;
    return { filePath };
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

/**
 * @param  {string} privateKey
 * fetches the file information from DB to be deleted
 */
const getFileToDelete = (privateKey) => {
  try {
    const fileData = DB.files.find((file) => file.privatekey === privateKey);
    if (!fileData) {
      throw {
        status: 400,
        message: `Can't find file with private key '${privateKey}'`,
      };
    }

    const filePath = fileData.path;
    return { filePath };
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

/**
 * @param  {string} privateKey
 * deletes a file from DB with the private key
 */
const deleteFile = (privateKey) => {
  try {
    const indexForDeletion = DB.files.findIndex(
      (file) => file.privatekey === privateKey
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find file with private key '${privateKey}'`,
      };
    }
    DB.files.splice(indexForDeletion, 1);
    saveToDatabase(DB);
    return { fileRemoved: true };
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

module.exports = {
  uploadNewFile,
  downloadFile,
  getFileToDelete,
  deleteFile,
};
