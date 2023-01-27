import { Quote, trade, TradeLogic } from "./trade";
import { Transaction } from "../Types/History";

describe("trade()", () => {
  it("must return no transactions", () => {
    const logic: TradeLogic = (quote: Quote) => {
      return null;
    };
    const transactions = trade(logic, []);
    expect(transactions).toStrictEqual([]);
  });
});

// class AutoBot {
//   account: number;
//   transactions: Transaction[];
//   quotes: Quote[];

// }

// const logic(quote: Quote): Transaction | null {
// 	const transaction: Transaction = {
// 		symbol: "BTCUSDT",
// 		type: "BUY",
// 		amount: 999,
// 		timestamp: quote.timestamp,
// 	};
// 	return transaction;
// }
