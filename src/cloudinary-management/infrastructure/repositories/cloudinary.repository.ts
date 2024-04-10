import dotenv from "dotenv"
import multer, { Multer } from 'multer';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import sharp from 'sharp';
import { CloudinaryInterface } from "../../domain/interfaces/cloudinary.interface";
import { CloudinaryFile } from "../../domain/interfaces/cloudinary-file.interface";
import signale from "signale";

export class CloudinaryRepository implements CloudinaryInterface {
    storage = multer.memoryStorage();

    constructor() {
        dotenv.config();
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
    }

    public upload: Multer = multer({ storage: this.storage });

    public async uploadFile(file: CloudinaryFile): Promise<string> {
        try {
            let cloudinaryUrl = "";
            const buffer = await sharp(file.buffer).toBuffer();
            const bufferString = buffer.toString('base64');
            cloudinary.uploader.upload(bufferString, (error: UploadApiErrorResponse, result: UploadApiResponse) => {
                if (error) {
                    throw error;
                }
                console.log(result);
                cloudinaryUrl = result.url;
            });
            return cloudinaryUrl;
        } catch (error) {
            signale.error(error);
            return "error";
        }
    }

    public async deleteFile(publicId: string): Promise<boolean> {
        const result = await cloudinary.uploader.destroy(publicId);

        return result.result === 'ok';
    }
}
