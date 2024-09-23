import cloudinary from "./cloudinary";

const uploadImageOnCloudinary = async (file: Express.Multer.File) => {
  const base64Image = Buffer.from(file.buffer).toString("base64");
  const dataURI = `data:${file.mimetype};base64,${base64Image}`;
  const uploadResponse = cloudinary.uploader.upload(dataURI);
  return (await uploadResponse).secure_url;
};

export default uploadImageOnCloudinary;
