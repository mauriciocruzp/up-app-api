import bcrypt from 'bcrypt-nodejs';
import CryptoJS from 'crypto-js';
import dotenv from "dotenv";

dotenv.config();

export class BcryptUtils {

    public static async hash(password: string): Promise<string> {
        const key = process.env.CRYPTO_KEY || '1234567891234567';
        return CryptoJS.AES.encrypt(password, key).toString();
    }

    public static async compare(password: string, hash: string): Promise<boolean> {
        let result = false;
        bcrypt.compare(password, hash, (err, res) => { result = res; });
        return result;
    }
}
