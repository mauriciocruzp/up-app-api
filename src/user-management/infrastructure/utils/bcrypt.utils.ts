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
        const decrypted = CryptoJS.AES.decrypt(hash, process.env.CRYPTO_KEY || '1234567891234567').toString(CryptoJS.enc.Utf8);
        if (decrypted === password) {
            return true;
        }
        return false;
    }
}
