import { ApiProperty } from "@nestjs/swagger";

export class ApiResponse {
    @ApiProperty()
    success: boolean;
    
    @ApiProperty()
    message: string;

    constructor(success: boolean, message: string) {
        this.success = success;
        this.message = message;
    }
}
