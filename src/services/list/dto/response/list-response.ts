
export class ListResponse {
    constructor(id: number | string, name: string) {
        this.id = id;
        this.name = name;
    }
    public id: number | string;
    public name: string;
}