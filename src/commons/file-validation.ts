import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { extname } from 'path';
import { BusinessException } from 'src/server/exception/business.exception';

@Injectable()
export class FileValidationPipe implements PipeTransform {
    transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
        if (!file) {
            throw BusinessException.missingPaymentFile();
        }
        const allowedFileTypes = ['image/jpeg', 'image/png'];
        const maxSize = 5 * 1024 * 1024; // 5MB;

        const fileExtension = extname(file.originalname).toLowerCase();
        if (!allowedFileTypes.includes(fileExtension)) {
            throw new BusinessException('Invalid file type', 400);
        }

        if (file.size > maxSize) {
            throw new BusinessException('File size too large', 400);
        }
        
        return file;
    }
}
