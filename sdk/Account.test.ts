import Account from "../schema/Account";
import { genNewAccount } from "./Account";

describe("genNewAccount", () => {
  test("must return account object", () => {
    const account: Account = {
      userID: "user123",
      wallets: [],
    };
    expect(genNewAccount("user123")).toStrictEqual(account);
  });
});
