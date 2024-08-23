export class Config {
    public static readonly JWT_SECRET = process.env.JWT_SECRET;
    public static readonly JWT_ISSUER = process.env.JWT_ISSUER;
    public static readonly SMTP_HOST = process.env.SMTP_HOST;
    public static readonly SMTP_PORT = process.env.SMTP_PORT;
    public static readonly SMTP_USER = process.env.SMTP_USER;
    public static readonly SMTP_PASS = process.env.SMTP_PASS;
}