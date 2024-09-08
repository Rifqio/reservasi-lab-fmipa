import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class PaymentSampleRequest {
    @Expose({ name: 'payment_code' })
    @IsNotEmpty({ message: 'Payment Code is required' })
    paymentCode: string;
}