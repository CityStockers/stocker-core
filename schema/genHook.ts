import { Firestore } from "firebase-admin/firestore";
import { useState } from "react";

export const COLLECTION_NAMES = {
  ACCOUNT: "Accounts",
};

export function genHook<T>() {
  return async function (db: Firestore, id: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<T | null>(null);
    db.collection(COLLECTION_NAMES.ACCOUNT)
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
