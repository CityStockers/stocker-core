import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { useState } from "react";

export const COLLECTION_NAMES = {
  ACCOUNT: "Accounts",
};

export function genHook<T = DocumentData>() {
  return async function (db: Firestore, id: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<T | null>(null);

    const collectionRef = collection(
      db,
      COLLECTION_NAMES.ACCOUNT
    ) as CollectionReference<T>;
    const docRef = doc<T>(collectionRef, id);
    getDoc(docRef);
    onSnapshot(
      docRef,
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
