const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const unlink = promisify(fs.unlink);

const uploadImage = async (file) => {
  try {
    // Generate a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const filename = uniqueSuffix + ext;
    
    // Create the uploads directory if it doesn't exist
    const uploadDir = path.join(__dirname, '..', 'uploads', 'categories');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Move the file to the uploads directory
    const filePath = path.join(uploadDir, filename);
    await fs.promises.rename(file.path, filePath);

    // Return the relative path for the database
    return `/uploads/categories/${filename}`;
  } catch (error) {
    // If there's an error, delete the uploaded file
    if (file && file.path) {
      await unlink(file.path);
    }
    throw new Error('Error uploading image: ' + error.message);
  }
};

const deleteImage = async (imagePath) => {
  try {
    if (imagePath) {
      const fullPath = path.join(__dirname, '..', imagePath);
      if (fs.existsSync(fullPath)) {
        await unlink(fullPath);
      }
    }
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};

module.exports = {
  uploadImage,
  deleteImage
}; 