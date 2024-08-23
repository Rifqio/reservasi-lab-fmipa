export class Config {
    public static readonly JWT_SECRET = process.env.JWT_SECRET;
    public static readonly JWT_ISSUER = process.env.JWT_ISSUER;
}