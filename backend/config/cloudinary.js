import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary only once
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      throw new Error("File path is required");
    }

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      folder: "virtual-assistant",
    });

    // Delete local temp file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return uploadResult.secure_url;
  } catch (error) {
    // Delete local temp file if upload fails
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.error("Cloudinary Upload Error:", error.message);

    throw new Error("Failed to upload image");
  }
};

export default uploadOnCloudinary;