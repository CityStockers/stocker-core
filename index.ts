import { Client, ConnectionConfig, QueryConfig } from "pg";
import { config } from "dotenv";

export type QuoteType = {
    symbol: string;
    price: number;
    timestamp: number;
};

config(); // Init environment variables.

export const dbConfig: ConnectionConfig = {
    user: "postgres",
    host: "localhost",
    database: "stocker-prod",
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
};

export function NewClient(config: ConnectionConfig) {
    return new Client(config);
}

export async function connect(client: Client) {
    try {
        await client.connect();
    } catch (err) {
        console.error(err);
    }
}

export async function upsertPrice(client: Client, quote: QuoteType): Promise<boolean> {
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

        const res = await client.query(sqlQuery, [symbol, String(timestamp), String(quote.price)]);
        if (res.rowCount < 1) {
            console.log(quote);
        }
        return res.rowCount >= 1 ? true : false;
    } catch (err) {
        console.error(err);
    }
    return false;
}

export async function query(
    client: Client,
    queryTextOrConfig: string | QueryConfig<string[]>,
    values?: string[]
) {
    const res = await client.query(queryTextOrConfig, values);
    return res;
}

export async function end(client: Client) {
    await client.end();
}
