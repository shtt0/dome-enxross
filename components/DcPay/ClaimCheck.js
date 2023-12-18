import React, { useEffect, useState } from "react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";

export default function Component() {
  const userAddress = useAddress(); // ログイン中のユーザーのアドレスを取得
  const { contract } = useContract(
    "0xDAF5F57262FD76972d73C3305247e9169952493b"
  );

  // トランザクションの状態を格納するための状態変数
  const [transactionStatus, setTransactionStatus] = useState({});

  // 特定のトランザクションの状態を取得する関数
  const fetchTransactionStatus = async (transactionId) => {
    const { data, isLoading } = useContractRead(
      contract,
      "transactionRecords",
      [userAddress, transactionId]
    );

    if (!isLoading && data) {
      setTransactionStatus((prevStatus) => ({
        ...prevStatus,
        [transactionId]: data,
      }));
    }
  };

  // トランザクションIDの配列
  const transactionIds = ["txId1", "txId2", "txId3"]; // ここに実際のトランザクションIDを設定

  // コンポーネントがマウントされたときに各トランザクションの状態を取得
  useEffect(() => {
    transactionIds.forEach((id) => {
      fetchTransactionStatus(id);
    });
  }, [userAddress, transactionIds]);

  // トランザクションの状態を表示する
  return (
    <div>
      {transactionIds.map((id) => (
        <div key={id}>
          Transaction ID: {id} - Status:{" "}
          {transactionStatus[id] ? "Processed" : "Unprocessed"}
        </div>
      ))}
    </div>
  );
}
