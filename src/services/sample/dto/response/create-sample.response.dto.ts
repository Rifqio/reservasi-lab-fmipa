import { Expose } from 'class-transformer';

interface ICreateSampleResponse {
    invoiceNumber: string;
    paymentCode: string;
    letterNumber: string;
}

export class CreateSampleResponse {
    constructor(data: ICreateSampleResponse) {
        this.invoiceNumber = data.invoiceNumber;
        this.letterNumber = data.letterNumber;
        this.paymentCode = data.paymentCode;
    }

    @Expose({ name: 'invoice_number' })
    invoiceNumber: string;

    @Expose({ name: 'payment_code' })
    paymentCode: string;

    @Expose({ name: 'letter_number' })
    letterNumber: string;
}
