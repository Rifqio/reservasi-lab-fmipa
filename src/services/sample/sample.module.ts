import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { RepositoriesModule } from 'src/database/repositories/repositories.module';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';

@Module({
    imports: [
    RepositoriesModule,
        MulterModule.register({
            storage: diskStorage({
                destination: path.join(__dirname, 'assets'),
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = path.extname(file.originalname);
                    const filename = `${file.originalname.split(ext)[0]}-${uniqueSuffix}${ext}`;
                    callback(null, filename);
                },
            }),
        }),
    ],
    controllers: [SampleController],
    providers: [SampleService],
})
export class SampleModule {}
