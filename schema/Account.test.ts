import { getApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { renderHook } from "@testing-library/react-hooks";
import { useAccount } from "./Account";
import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import fs from "fs";

const FIRESTORE_RULES = fs.readFileSync("./firestore.rules", "utf8");

test("useAccount", async () => {
  const testEnv = await initializeTestEnvironment({
    projectId: "stocker-c11e2",
    firestore: { rules: FIRESTORE_RULES },
  });
  const app = testEnv.unauthenticatedContext();
  const db = app.firestore();
  const userId = "TEST";

  const { result, waitForNextUpdate } = renderHook(() =>
    useAccount(db, userId)
  );
  expect((await result.current).loading).toBe(true);

  await waitForNextUpdate();
  expect((await result.current).loading).toBe(false);
  return;
});
