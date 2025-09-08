import { v2 as cloudinary } from "cloudinary";

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  [key: string]: any;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "next-cloudinary-uploads" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResult);
          }
        );
        uploadStream.end(buffer);
      }
    );

    return result.secure_url; // ✅ Cloudinary file URL
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Upload failed");
  }
};
