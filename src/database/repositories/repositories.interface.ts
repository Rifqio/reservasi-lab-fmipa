export interface Repository<T, ID = string> {
    findById(id: ID): Promise<T | null>;
    findAll(): Promise<T[]>;
    create(data: T): Promise<T>;
    update(id: ID, data: Partial<T>): Promise<T>;
    delete(id: ID): Promise<void>;
}
