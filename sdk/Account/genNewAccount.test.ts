import { Account } from "../Types/Account";
import genNewAccount from "./genNewAccount";

describe("genNewAccount", () => {
  test("must return account object", () => {
    const account: Account = {
      userID: "user123",
      wallets: [
        {
          symbol: "USD",
          amount: 0,
        },
      ],
    };
    expect(genNewAccount("user123")).toStrictEqual(account);
  });
});
