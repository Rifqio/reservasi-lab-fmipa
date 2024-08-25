import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, Length, Max } from 'class-validator';

export class CreateSampleRequest {
    @Expose({ name: 'research_title' })
    @IsNotEmpty({ message: 'Research title is required' })
    @Length(3, 100)
    researchTitle: string;

    @Expose({ name: 'sample_name' })
    @IsNotEmpty({ message: 'Sample name is required' })
    @Length(3, 100)
    sampleName: string;

    @Expose({ name: 'sample_quantity' })
    @IsNotEmpty({ message: 'Sample quantity is required' })
    @Max(30, { message: 'Too many samples at once'})
    sampleQuantity: number;

    @Length(3, 255)
    @IsOptional()
    notes?: string;
}
