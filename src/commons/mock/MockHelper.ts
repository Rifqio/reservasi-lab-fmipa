import crypto from 'crypto';
import { faker } from '@faker-js/faker';
import { StudentProfile } from '../@types/mock/StudentProfile';

export class MockHelper {
    private static generateRandomString(length: number): string {
        return faker.string.alphanumeric(length);
    }

    public static mockStudentProfile(): StudentProfile {
        return {
            nim: 'UNSET-' + this.generateRandomString(9),
            phone_number: 'UNSET-' + this.generateRandomString(9),
            batch: Math.floor(Math.random() * 10) + 1,
        };
    }

    public static mockLecturerProfile(): { nip: string } {
        return {
            nip: 'UNSET-' + this.generateRandomString(9),
        };
    }
}
