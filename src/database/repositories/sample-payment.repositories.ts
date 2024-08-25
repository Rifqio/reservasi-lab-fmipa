import { Utils } from "src/commons/utils";
import { DatabaseService } from "../database.service.";

export class SamplePaymentRepositories {
    constructor(private db: DatabaseService) {}

    public async initiatePayment(sampleId: number) {
        const paymentCode = Utils.generateSamplePaymentCode(sampleId);
        return await this.db.samplePayments.create({
            data: {
                payment_code: paymentCode,
                sample_test_id: sampleId,
            }
        });
    }
}