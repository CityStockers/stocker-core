import * as fs from "fs";
export function readFile(filePath) {
    return fs.readFileSync(filePath).toString();
}
