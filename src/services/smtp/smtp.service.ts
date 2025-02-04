import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { Config } from 'src/config/config';

@Injectable()
export class SMTPService {
    private logger = new Logger(SMTPService.name);
    private transporter: nodemailer.Transporter;

    constructor() {
        this.logger.log('SMTP Service Initialized');
        this.transporter = nodemailer.createTransport({
            host: Config.SMTP_HOST,
            port: parseInt(Config.SMTP_PORT),
            auth: {
                user: Config.SMTP_USER,
                pass: Config.SMTP_PASS,
            },
            logger: true,
            debug: true,
        });
    }

    public async sendMailHtml(data: MailOptions) {
        const mailOptions = {
            from: Config.SMTP_EMAIL_FROM,
            to: data.to,
            subject: data.subject,
            html: data.html,
        };

        this.transporter.sendMail(mailOptions, (error, info: nodemailer.SentMessageInfo) => {
            if (error) {
                this.logger.error(`Error sending email: ${error.message} | stack: ${error.stack}`);
            } else {
                this.logger.log(`Email sent: ${info.response}`);
            }
        });
    }
}
