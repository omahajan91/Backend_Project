import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
  try {
    // Moved config inside the function to wait until dotenv parses process.env
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // console.log("file is uploaded on cloudinary", response);

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // remove the file from local device
    }
    return null;
  }
};

export { uploadOnCloudinary };
