import { Transaction } from "../Types/History";

export type TradeLogic = (quote: Quote) => Transaction | null;

// interface AutoBot {
//     logic(quote: Quote): Transaction | null {
//         fetch(previousTransactions)
//     }

//     getMeanPrice(): number {

//     }
// }

// class AutoBot {
//   account: number;
//   transactions: Transaction[];
//   quotes: Quote[];

//   logic(quote: Quote): Transaction | null {}
// }

export type Quote = {
  price: number;
  timestamp: number;
};

export function sortQuotes(quotes: Quote[]): Quote[] {
  return quotes.slice(0).sort((quoteA, quoteB) => {
    if (quoteA.timestamp < quoteB.timestamp) return -1;
    if (quoteA.timestamp > quoteB.timestamp) return 1;
    return 0;
  });
}

export function trade(logic: TradeLogic, quotes: Quote[]): Transaction[] {
  const sorted = sortQuotes(quotes);
  const transactions: Transaction[] = [];
  for (let quote of sorted) {
    const transaction = logic(quote);
    if (transaction) {
      transactions.push(transaction);
    }
  }
  return transactions;
}
