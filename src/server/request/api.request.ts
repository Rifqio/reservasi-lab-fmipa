import { TokenPayload } from "src/services/auth/dto/token-payload";

export class ApiRequest extends Request {
    user: TokenPayload;
}