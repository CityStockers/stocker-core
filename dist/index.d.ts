import { Client, ConnectionConfig, QueryConfig } from "pg";
export declare type QuoteType = {
    symbol: string;
    price: number;
    timestamp: number;
};
export declare const dbConfig: ConnectionConfig;
export declare function NewClient(config: ConnectionConfig): Client;
export declare function connect(client: Client): Promise<void>;
export declare function upsertPrice(client: Client, quote: QuoteType): Promise<boolean>;
export declare function query(client: Client, queryTextOrConfig: string | QueryConfig<string[]>, values?: string[]): Promise<import("pg").QueryResult<any>>;
export declare function end(client: Client): Promise<void>;
