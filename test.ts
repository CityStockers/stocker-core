import { DB } from ".";

async function main() {
    const db = new DB();
    await db.connect();

    await db.upsertPrice({ symbol: "AAPL", price: 123.42, timestamp: 164738291 });
}

main();
