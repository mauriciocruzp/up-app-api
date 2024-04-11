import dotenv from "dotenv"
import signale from "signale";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

export class FileRepository {
    s3Client = new S3Client({

        region: process.env.S3_REGION || "",
        credentials: {

            accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        }
    });

    constructor() {
        dotenv.config();
    }

    public async uploadFile(file: Express.Multer.File): Promise<string> {
        try {
            const BUCKET_NAME = process.env.S3_BUCKET_NAME || "";
            const fileStream = file.buffer;

            const randomName = Math.random().toString(36).substring(7);
            file.originalname = `${randomName}-${file.originalname}`;

            const uploadParams = {
                Bucket: BUCKET_NAME,
                Key: file.originalname,
                Body: fileStream,
            };

            await this.s3Client.send(new PutObjectCommand(uploadParams));
            const object = await this.s3Client.send(new GetObjectCommand(uploadParams));
            console.log(object);

            const url = `https://${BUCKET_NAME}.s3.amazonaws.com/${file.originalname}`;
            return url || "error";

        } catch (error) {
            signale.error(error);
            return "error";
        }
    }
}
