import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { COLLECTION_NAMES } from "../Constants";

export async function hasAccount(
  db: firebase.firestore.Firestore,
  userID: string
) {
  const data = await db.collection(COLLECTION_NAMES.ACCOUNTS).doc(userID).get();
  return data.exists;
}
