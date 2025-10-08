const ftp = require("basic-ftp");
const { FTP_CONFIG } = require("./ftpConfig");

const uploadFileToFTP = async (file) => {
  const client = new ftp.Client();
  client.ftp.verbose = true; // Enable verbose logging for debugging

  try {
    await client.access(FTP_CONFIG);

    // Ensure the /media directory exists
    await client.ensureDir("/media");

    // Generate a unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.originalname}`;
    const remotePath = `/media/${filename}`;

    // Upload the file
    await client.uploadFrom(file.path, remotePath);

    // Construct the public URL (adjust based on your FTP server's URL structure)
    const fileUrl = `http://${FTP_CONFIG.host}/media/${filename}`;

    return fileUrl;
  } catch (error) {
    throw new Error(`FTP upload failed: ${error.message}`);
  } finally {
    client.close();
  }
};
const deleteFileFromFTP = async (fileUrl) => {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access(FTP_CONFIG);

    // Extract the remote path from the file URL
    const remotePath = new URL(fileUrl).pathname; // e.g., /media/filename
    await client.remove(remotePath);
  } catch (error) {
    throw new Error(`FTP deletion failed: ${error.message}`);
  } finally {
    client.close();
  }
};

module.exports = { uploadFileToFTP, deleteFileFromFTP };
