import { Firestore } from "firebase-admin/firestore";
import { useState } from "react";
import Account from "./Account";
const ACCOUNT_COLLECTION_NAME = "Accounts";

export async function useAccount(db: Firestore, id: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  db.collection(ACCOUNT_COLLECTION_NAME)
    .doc(id)
    .onSnapshot(
      (snapshot) => {
        const fsAccount = snapshot.data();
        setAccount(fsAccount ? (fsAccount as Account) : null);
        setError(null);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setAccount(null);
        setLoading(false);
      }
    );
  return { account, loading, error };
}
