import Account from "../schema/Account";

export function genNewAccount(userID: string): Account {
  return {
    userID: userID,
    wallets: [],
  };
}
