import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary"
import multer from "multer"

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

export const uploadImage = (file:string) => { 
    return cloudinary.v2.uploader.upload(file, { folder:"social" })
}

// const folder = "social"

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary.v2,
// })

// const multerStorage = multer({storage})

// export default{ cloudinary.v2 as multerStorage};

// cloudinary.v2.uploader.upload()