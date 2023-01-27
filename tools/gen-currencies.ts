import fs from "fs";

const CSV_PATH = "./static/currencies.csv";
const JSON_PATH = "./static/currencies.json";

console.log(`--------------------------`);
console.log(`TOOL - GENERATE CURRENCIES`);
console.log(`Reading ${CSV_PATH}`);
const csvRaw = fs.readFileSync(CSV_PATH);
const rowsRaw = csvRaw
  .toString()
  .split(`\n`)
  .map((row) => row.split(",").map((v) => v.trim()));

const headerRow = rowsRaw[0];
const rows = rowsRaw.slice(1);
const currencies = rows.map((row) => {
  const currency = {};
  for (let i = 0; i < row.length; i++) {
    currency[headerRow[i]] = row[i];
  }
  return currency;
});

console.log(`Writing ${JSON_PATH}`);
fs.writeFileSync(JSON_PATH, JSON.stringify(currencies, null, 2));

console.log(`DONE. \n`);
