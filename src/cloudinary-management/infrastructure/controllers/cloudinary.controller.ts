import { DeleteFileUseCase } from "../../application/use-cases/delete-file.use-case";
import { UploadFileUseCase } from "../../application/use-cases/upload-file.use-case";
import { CloudinaryFile } from "../../domain/interfaces/cloudinary-file.interface";
import { Request, Response } from "express";
import fs from 'fs';


export class CloudinaryController {
    constructor(readonly uploadFileUseCase: UploadFileUseCase, readonly deleteFileUseCase: DeleteFileUseCase) { }

    async uploadFile(req: Request, res: Response) {
        let cFile: CloudinaryFile;
        var fstream;
        req.pipe(req.busboy);

        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);
            fstream = fs.createWriteStream(__dirname + '/file/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                res.redirect('back');
            });
        });

        cFile = req.file as CloudinaryFile;

        console.log(fstream);

        const result = await this.uploadFileUseCase.execute(cFile);

        if (!result) {
            return res.status(400).json({ message: "Failed to upload file" });
        }
        return res.status(201).json({ message: "File uploaded successfully!", url: result });
    }

    async deleteFile(req: Request, res: Response) {
        const { id } = req.params;
        const result = await this.deleteFileUseCase.execute(id);

        if (!result) {
            return res.status(400).json({ message: "Failed to delete file" });
        }
        return res.status(200).json({ message: "File deleted successfully!" });
    }
}
