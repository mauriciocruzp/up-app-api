import { UploadFileUseCase } from "../../application/use-cases/upload-file.use-case";
import { Request, Response } from "express";


export class FileController {
    constructor(readonly uploadFileUseCase: UploadFileUseCase) { }

    async uploadFile(req: Request, res: Response) {
        const result = await this.uploadFileUseCase.execute(req.file as Express.Multer.File);

        if (!result) {
            return res.status(400).json({ message: "Failed to upload file" });
        }
        return res.status(200).json({ message: "File uploaded successfully!" });
    }
}
