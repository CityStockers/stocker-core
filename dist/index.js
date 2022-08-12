var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Client } from "pg";
import { config } from "dotenv";
config(); // Init environment variables.
const dbConfig = {
    user: "postgres",
    host: "localhost",
    database: "stocker-prod",
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
};
export class DB {
    constructor() {
        this.client = new Client(dbConfig);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    upsertPrice(quote) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const res = yield this.query(sqlQuery, [
                    symbol,
                    String(timestamp),
                    String(quote.price),
                ]);
                if (res.rowCount < 1) {
                    console.log(quote);
                }
                return res.rowCount >= 1 ? true : false;
            }
            catch (err) {
                console.error(err);
            }
            return false;
        });
    }
    query(queryTextOrConfig, values) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.client.query(queryTextOrConfig, values);
            return res;
        });
    }
    end() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.end();
        });
    }
}
