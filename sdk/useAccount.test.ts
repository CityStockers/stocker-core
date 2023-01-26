import fs from "fs";
import { renderHook } from "@testing-library/react-hooks";
import { useAccount } from "./useAccount";
import { genNewAccount } from "../schema/Account";
import { COLLECTION_NAMES } from "./genHook";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";

const FIRESTORE_RULES = fs.readFileSync("./firestore.rules", "utf8");

describe("useAccount", () => {
  let testEnv: RulesTestEnvironment;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: "stocker-c11e2",
      firestore: { rules: FIRESTORE_RULES },
    });
  });

  beforeEach(() => {
    testEnv.clearFirestore();
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
    expect((await result.current).loading).toBe(true);
    expect((await result.current).account).toBe(null);
    expect((await result.current).error).toBe(null);

    // state check after first update
    await waitForNextUpdate();
    expect((await result.current).loading).toBe(false);
    expect((await result.current).account).toStrictEqual(null);
    expect((await result.current).error).not.toBe(null); // Auth Error must exists
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
    expect((await result.current).loading).toBe(true);
    expect((await result.current).account).toBe(null);
    expect((await result.current).error).toBe(null);

    // state check after first update
    await waitForNextUpdate();
    expect((await result.current).loading).toBe(false);
    expect((await result.current).account).toStrictEqual({
      userID: "userid_123",
      wallets: [],
    });
    expect((await result.current).error).toBe(null); // Auth Error must exists
  });
});
