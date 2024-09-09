import { ArgumentMetadata, Injectable, Logger, PipeTransform } from '@nestjs/common';
import { BusinessException } from 'src/server/exception/business.exception';

@Injectable()
export class FileValidationPipe implements PipeTransform {
    private readonly logger = new Logger(FileValidationPipe.name);
    transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
        if (!file) {
            throw BusinessException.missingPaymentFile();
        }
        const allowedFileTypes = ['image/png', 'image/jpeg'];
        const maxSize = 5 * 1024 * 1024; // 5MB;

        if (!allowedFileTypes.includes(file.mimetype)) {
            throw new BusinessException('Invalid file type', 400);
        }

        if (file.size > maxSize) {
            throw new BusinessException('File size too large', 400);
        }

        return file;
    }
}
