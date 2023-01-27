import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useEffect, useState } from "react";
import { COLLECTION_NAMES } from "../Constants";
import { Account } from "../Types/Account";
import { History, Transaction } from "../Types/History";

function newHistory(userID: string): History {
  return {
    userID: userID,
    transactions: [],
  };
}

async function buy(
  db: firebase.firestore.Firestore,
  userID: string,
  symbol: string,
  amount: number
) {
  const historiesRef = db.collection(
    COLLECTION_NAMES.HISTORIES
  ) as firebase.firestore.CollectionReference<History>;
  const snapshot = await historiesRef.where("userID", "==", userID).get();
  if (snapshot.empty) {
    const docRef = await historiesRef.add(newHistory(userID));
  }
  const docRef = snapshot.docs[0];
  const history = docRef.data();
  const newTransaction: Transaction = {
    symbol: symbol,
    type: "BUY",
    amount: amount,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(), // TODO: DANGER
  };

  docRef.ref.update({
    transactions: [...history.transactions, newTransaction],
  });
}

export default buy;
