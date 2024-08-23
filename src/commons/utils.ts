import { faker } from '@faker-js/faker';
import moment from 'moment';

export class Utils {
    constructor() {}
    
    public static generateRandomString(length: number): string {
        return faker.string.alphanumeric(length);
    }

    public static generateLetterNumber(): string {
        // This will return MIPA-TIMESTAMP
        const currentDate = moment().format('YYYYMMDDHHmmss');
        return `MIPA-${currentDate}`;
    }

    public static generateUUID(): string {
        return faker.string.uuid();
    }
}
