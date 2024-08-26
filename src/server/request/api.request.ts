import { TokenPayload } from "src/services/auth/dto/token-payload";
export interface ApiRequest extends Request {
    user: TokenPayload;
    // This will be used to get the original URL of the request
    originalUrl: string;
}
