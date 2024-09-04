import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class LabCreateRequest {  
    @IsNotEmpty()
    @Expose({ name: 'lab_name' })
    public labName: string;
}