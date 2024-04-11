export interface CloudinaryInterface {
    uploadFile(file: Express.Multer.File): Promise<string>;
}
