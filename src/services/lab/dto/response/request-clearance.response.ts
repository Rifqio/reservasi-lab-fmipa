export class RequestClearanceResponse {
    public readonly letter_number: string;

    constructor(letter_number: string) {
        this.letter_number = letter_number;
    }
}