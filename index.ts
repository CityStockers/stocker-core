import { Client, ConnectionConfig, QueryConfig } from "pg";
import { config } from "dotenv";

export type QuoteType = {
    symbol: string;
    price: number;
    timestamp: number;
};

config(); // Init environment variables.

const dbConfig: ConnectionConfig = {
    user: "postgres",
    host: "localhost",
    database: "stocker-prod",
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
};

export class DB {
    client: Client;

    constructor() {
        this.client = new Client(dbConfig);
    }

    async connect() {
        try {
            await this.client.connect();
        } catch (err) {
            console.error(err);
        }
    }

    async upsertPrice(quote: QuoteType): Promise<boolean> {
        try {
            const timestamp = new Date(quote.timestamp).toLocaleString("en-US");
            const symbol = quote.symbol;
            const sqlQuery = `
            INSERT INTO quote(id, symbol, timestamp, price) 
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (id) 
            DO UPDATE
            SET price = $4
            WHERE quote.id = $1;`;

            const res = await this.query(sqlQuery, [
                symbol,
                String(timestamp),
                String(quote.price),
            ]);
            if (res.rowCount < 1) {
                console.log(quote);
            }
            return res.rowCount >= 1 ? true : false;
        } catch (err) {
            console.error(err);
        }
        return false;
    }

    private async query(queryTextOrConfig: string | QueryConfig<string[]>, values?: string[]) {
        const res = await this.client.query(queryTextOrConfig, values);
        return res;
    }

    async end() {
        await this.client.end();
    }
}
