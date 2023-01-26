import fs from "fs";
import { renderHook } from "@testing-library/react-hooks";
import { useAccount } from "./useAccount";
import { COLLECTION_NAMES } from "./genHook";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { genNewAccount } from "./Account";
import Account from "../schema/Account";

const FIRESTORE_RULES = fs.readFileSync("./firestore.rules", "utf8");

describe("useAccount", () => {
  let testEnv: RulesTestEnvironment;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: "stocker-test",
      firestore: { rules: FIRESTORE_RULES },
    });
  });

  afterEach(async () => {
    await testEnv.clearFirestore();
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  test("with unathenticated user", async () => {
    const app = testEnv.unauthenticatedContext();
    const db = app.firestore();

    // initial firestore setup. add account document.
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      await db
        .collection(COLLECTION_NAMES.ACCOUNTS)
        .doc("userid_123")
        .set(genNewAccount("userid_123"));
    });

    // must fail when trying to fetch account data(because it is unathenticated)
    assertFails(
      db.collection(COLLECTION_NAMES.ACCOUNTS).doc("userid_123").get()
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useAccount(db, "userid_123")
    );

    // Initial state check
    expect(result.current.loading).toBe(true);
    expect(result.current.account).toBe(null);
    expect(result.current.error).toBe(null);

    // state check after first update
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.account).toBe(null);
    expect(result.current.error).not.toBe(null); // Auth Error must exists
  });

  test("with athenticated user", async () => {
    const testEnv = await initializeTestEnvironment({
      projectId: "stocker-c11e2",
      firestore: { rules: FIRESTORE_RULES },
    });

    // userid_123 is userid of authenticated user
    const app = testEnv.authenticatedContext("userid_123");
    const db = app.firestore();

    // initial firestore setup. add account document.
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();
      await db
        .collection(COLLECTION_NAMES.ACCOUNTS)
        .doc("userid_123")
        .set(genNewAccount("userid_123"));
    });

    // must succeed when trying to fetch account data(because it is authenticated)
    assertSucceeds(
      db.collection(COLLECTION_NAMES.ACCOUNTS).doc("userid_123").get()
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useAccount(db, "userid_123")
    );

    // Initial state check
    expect(result.current.loading).toBe(true);
    expect(result.current.account).toBe(null);
    expect(result.current.error).toBe(null);

    await waitForNextUpdate();

    // state check after first update
    expect(result.current.loading).toBe(false);
    const expectedAccount: Account = {
      userID: "userid_123",
      wallets: [],
    };
    expect(result.current.account).toStrictEqual(expectedAccount);
    expect(result.current.error).toBe(null); // Auth Error must exists
  });
});
