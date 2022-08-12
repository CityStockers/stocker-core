import { Client } from "pg";
export declare type QuoteType = {
    symbol: string;
    price: number;
    timestamp: number;
};
export declare class DB {
    client: Client;
    constructor();
    connect(): Promise<void>;
    upsertPrice(quote: QuoteType): Promise<boolean>;
    private query;
    end(): Promise<void>;
}
