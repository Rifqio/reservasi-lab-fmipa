import { LabClearancePurpose } from "@prisma/client";
import { IsEnum, IsNotEmpty } from "class-validator";

export class LabClearanceRequest {
    @IsNotEmpty()
    @IsEnum(LabClearancePurpose)
    public purpose : LabClearancePurpose;
}