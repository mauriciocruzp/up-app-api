import { CloudinaryFile } from "./cloudinary-file.interface";

export interface CloudinaryInterface {
    uploadFile(file: CloudinaryFile): Promise<string>;
    deleteFile(publicId: string): Promise<boolean>;
}
