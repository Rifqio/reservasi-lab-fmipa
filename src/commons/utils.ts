import { faker } from '@faker-js/faker';

export class Utils {
    public static generateRandomString(length: number): string {
        return faker.string.alphanumeric(length);
    }
}
