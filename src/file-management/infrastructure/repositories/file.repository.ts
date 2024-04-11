import dotenv from "dotenv"
import signale from "signale";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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

            const uploadParams = {
                Bucket: BUCKET_NAME,
                Key: file.originalname,
                Body: fileStream,
            };

            const result = await this.s3Client.send(new PutObjectCommand(uploadParams));
            console.log(result);

            return "https://";

        } catch (error) {
            signale.error(error);
            return "error";
        }
    }
}
