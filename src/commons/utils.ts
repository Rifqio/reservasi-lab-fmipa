import { faker } from '@faker-js/faker';
import { format } from 'date-fns';

export class Utils {
    constructor() {}

    public static generateRandomString(length: number): string {
        return faker.string.alphanumeric(length);
    }

    public static generateLetterNumber(): string {
        // This will return MIPA-TIMESTAMP
        return `MIPA-${format(new Date(), 'yyyyMMddHHmmss')}`;
    }

    public static generateUUID(): string {
        return faker.string.uuid();
    }

    public static generateInvoiceNumber(): string {
        return `INV-${format(new Date(), 'yyyyMMddHHmmss')}`;
    }

    public static generateSamplePaymentCode(sampleId: number): string {
        const randomString = faker.string.alpha({ length: 15, casing: 'upper' });
        return `SP${sampleId}-${randomString}`;
    }

    public static generateSampleTestLetterNumber(): string {
        return `MIPA/US-${format(new Date(), 'yyyyMMddHHmmss')}`;
    }

    public static isEmailStudent(email: string): boolean {
        return email.endsWith('@student.uns.ac.id');
    }
}
