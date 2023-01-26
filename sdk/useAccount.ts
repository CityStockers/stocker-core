import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import Account from "../schema/Account";
import { COLLECTION_NAMES, genHook } from "./genHook";

firebase.firestore.Firestore;
export async function useAccount(
  db: firebase.firestore.Firestore,
  userID: string
) {
  const obj = genHook<Account>(COLLECTION_NAMES.ACCOUNTS)(db, userID);
  return {
    account: obj.data,
    loading: obj.loading,
    error: obj.error,
  };
}
