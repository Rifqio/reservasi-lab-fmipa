import * as crypto from 'crypto';
import { size } from 'lodash';
import { Config } from 'src/config/config';

export class Encryption {
    private static algorithm: string;
    private static key: Buffer;
    private static iv: Buffer;

    static {
        if (!Config.PRIVATE_ALGORITHM || !Config.PRIVATE_SECRET || !Config.PRIVATE_IV) {
            throw new Error('Encryption configuration is missing.');
        }

        Encryption.algorithm = Config.PRIVATE_ALGORITHM;
        Encryption.key = Buffer.from(Config.PRIVATE_SECRET, 'hex');
        Encryption.iv = Buffer.from(Config.PRIVATE_IV, 'hex');

        if (size(Encryption.key) !== 32) {
            throw new Error('Private secret key must be 32 bytes (256 bits) in length.');
        }

        if (size(Encryption.iv) !== 16) {
            throw new Error('Initialization vector (IV) must be 16 bytes (128 bits) in length.');
        }
    }

    public static encrypt(text: string): string {
        const cipher = crypto.createCipheriv(Encryption.algorithm, Encryption.key, Encryption.iv);
        let encrypted = cipher.update(text, 'utf8', 'base64');
        return encrypted += cipher.final('base64');
    }

    public static decrypt(encryptedText: string): string {
        const decipher = crypto.createDecipheriv(Encryption.algorithm, Encryption.key, Encryption.iv);
        let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
        return decrypted += decipher.final('utf8');
    }
}
