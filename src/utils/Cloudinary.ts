import axios from 'axios';

const CLOUD_NAME = 'drwv6ap7i'; // Replace with your Cloudinary cloud name
const UPLOAD_PRESET = 'profile_image'; // Replace with the upload preset name
const FOLDER_NAME = 'profile'; // Replace with the folder name

export const uploadImageToCloudinary = async (imageUri: string): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg', // MIME type of the image
      name: 'image.jpg',
    } as any);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', FOLDER_NAME);

    const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    // console.log("response: ", response);

    return response.data.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};
