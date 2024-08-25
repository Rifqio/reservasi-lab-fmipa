import { Injectable } from '@nestjs/common';
import { SampleTestRepositories } from 'src/database/repositories';
import { CreateSampleRequest } from './dto/request';

@Injectable()
export class SampleService {
    constructor(private sampleTestRepository: SampleTestRepositories) {}

    public async createTestSample(email: string, payload: CreateSampleRequest) {
        return await this.sampleTestRepository.create(email, payload);
    }
}
