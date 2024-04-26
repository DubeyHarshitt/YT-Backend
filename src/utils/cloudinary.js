import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_CLOUD_KEY, 
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET, 
});


const uploadOnCludinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // Upload the file on coludinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        // File has be uploaded successfully
        console.log('File is Uploaded on Cloudinary ', response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath);
        // remove the locally saved tempoaray file as the upload operation got failed
        return null;
    }
}

export {uploadOnCludinary};