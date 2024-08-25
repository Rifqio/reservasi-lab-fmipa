import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service.';
import { CreateSampleRequest } from 'src/services/sample/dto/request';
import { Utils } from 'src/commons/utils';
import { CreateSampleResponse } from 'src/services/sample/dto/response';

@Injectable()
export class SampleTestRepositories {
    constructor(private db: DatabaseService) {}

    public async create(email: string, data: CreateSampleRequest) : Promise<CreateSampleResponse> {
        const letterNumber = Utils.generateSampleTestLetterNumber();
        const invoiceNumber = Utils.generateInvoiceNumber();
        return await this.db.$transaction(async (db) => {
            const sample = await db.sampleTests.create({
                data: {
                    user_email: email,
                    letter_number: letterNumber,
                    sample_name: data.sampleName,
                    sample_quantity: data.sampleQuantity,
                    notes: data.notes,
                    invoice_number: invoiceNumber,
                    research_title: data.researchTitle,
                    date_received: new Date(),
                },
                select: {
                    id_sample_tests: true,
                    invoice_number: true,
                    letter_number: true,
                },
            });
            const samplePayment = await db.samplePayments.create({
                data: {
                    payment_code: Utils.generateSamplePaymentCode(sample.id_sample_tests),
                    sample_test_id: sample.id_sample_tests,
                },
                select: {
                    payment_code: true,
                }
            });
            return new CreateSampleResponse({
                invoiceNumber: sample.invoice_number,
                paymentCode: samplePayment.payment_code,
                letterNumber: sample.letter_number,
            });
        });
    }
}
