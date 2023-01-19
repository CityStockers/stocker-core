import { Firestore } from "firebase-admin/firestore";
import { useState } from "react";
import Account from "./Account";
const ACCOUNT_COLLECTION_NAME = "Accounts";

export async function useAccount(db: Firestore, id: string) {
  return generateHook<Account>()(db, id);
}

export function generateHook<T>() {
  return async function (db: Firestore, id: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<T | null>(null);
    db.collection(ACCOUNT_COLLECTION_NAME)
      .doc(id)
      .onSnapshot(
        (snapshot) => {
          const fsDocData = snapshot.data();
          setData(fsDocData ? (fsDocData as T) : null);
          setError(null);
          setLoading(false);
        },
        (error) => {
          setError(error);
          setData(null);
          setLoading(false);
        }
      );
    return { data, loading, error };
  };
}
