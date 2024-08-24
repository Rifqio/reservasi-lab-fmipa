/**
 * This define configuration class to store all the environment variables
 */
export class Config {
    public static readonly JWT_SECRET = process.env.JWT_SECRET;
    public static readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
    public static readonly JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN;
    public static readonly JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
    public static readonly JWT_ISSUER = process.env.JWT_ISSUER;
    public static readonly JWT_AUDIENCE = process.env.JWT_AUDIENCE;
    public static readonly SMTP_HOST = process.env.SMTP_HOST;
    public static readonly SMTP_PORT = process.env.SMTP_PORT;
    public static readonly SMTP_USER = process.env.SMTP_USER;
    public static readonly SMTP_PASS = process.env.SMTP_PASS;
}