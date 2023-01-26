import firebase from "firebase/compat/app";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";

export const COLLECTION_NAMES = {
  ACCOUNTS: "accounts",
};

export function genHook<T = DocumentData>(collectionName: string) {
  return function (db: firebase.firestore.Firestore, id: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
      const unsubscribe = db
        .collection(collectionName)
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
      return unsubscribe;
    }, []);
    return { data, loading, error };
  };
}
