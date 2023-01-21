import { Firestore } from "firebase/firestore";
import { COLLECTION_NAMES, genHook } from "./genHook";

export async function useAccount(db: Firestore, userId: string) {
  return genHook<Account>()(db, userId);
}

// export async function createAccount(db: Firestore, userId: string) {
//   const snapshot = await db
//     .collection(COLLECTION_NAMES.ACCOUNT)
//     .where("userId", "==", userId).
//     .get();
//     if(snapshot.empty) {
//         throw new Error(`Cannot find document in collection ${"Accounts"} with query `)
//     }
// }

export type Account = {
  wallets: Wallet[];
  userId: string;
};

export type Wallet = {
  currency: Currency;
  amount: number;
  histories: Transaction[];
};

export type Transaction = {
  currency: Currency;
  amount: number;
  timestamp: number; // Date.getTime()
};

export type Currency = {
  type: "CASH" | "CRYPTO" | "STOCK";
  ticker: string; // USD, BTCUSDT, AAPL, TSLA
  name: string; // Dollar, Bitcoin-Dollar, Apple Inc, Tesla
};

export default Account;
