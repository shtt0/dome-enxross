import { useContract, useContractRead, useWallet } from "@thirdweb-dev/react";
import React, { useState, useEffect } from "react";

export default function CheckInComponent() {
  const { contract } = useContract(
    "0x09Cea87151Af343b7C26a0EDD5E6d3dE90865fa1"
  );
  const { account } = useWallet();

  // TokenIDとSpotIDの初期値を設定
  const [tokenId, setTokenId] = useState(0);
  const [spotId1, setSpotId1] = useState(0);
  const [spotId2, setSpotId2] = useState(0);

  // 小窓内でのチェックイン状況を管理
  const [isVisited1, setIsVisited1] = useState(false);
  const [isVisited2, setIsVisited2] = useState(false);

  // TokenIDが変更されたときにスポットのチェックイン状況を取得
  useEffect(() => {
    if (tokenId && account) {
      // スポット1のチェックイン状況を取得
      useContractRead(contract, "isSpotVisited", [tokenId, spotId1])
        .then((result) => {
          setIsVisited1(result); // スポット1のチェックイン状況を更新
        })
        .catch((error) => {
          console.error("Error fetching spot 1 check-in status:", error);
        });

      // スポット2のチェックイン状況を取得
      useContractRead(contract, "isSpotVisited", [tokenId, spotId2])
        .then((result) => {
          setIsVisited2(result); // スポット2のチェックイン状況を更新
        })
        .catch((error) => {
          console.error("Error fetching spot 2 check-in status:", error);
        });
    }
  }, [tokenId, spotId1, spotId2, account, contract]);

  // チェックイン関数
  const checkIn = async (spotId) => {
    try {
      if (tokenId && account) {
        await contract.call("checkIn", [tokenId, spotId]);
        // チェックイン後、スポットのチェックイン状況を再取得
        if (spotId === spotId1) {
          useContractRead(contract, "isSpotVisited", [tokenId, spotId1])
            .then((result) => {
              setIsVisited1(result);
            })
            .catch((error) => {
              console.error("Error fetching spot 1 check-in status:", error);
            });
        } else if (spotId === spotId2) {
          useContractRead(contract, "isSpotVisited", [tokenId, spotId2])
            .then((result) => {
              setIsVisited2(result);
            })
            .catch((error) => {
              console.error("Error fetching spot 2 check-in status:", error);
            });
        }
      }
    } catch (error) {
      console.error("Error checking in:", error);
    }
  };

  return (
    <div>
      <h2>Check-In Status</h2>
      <p>Token ID: {tokenId}</p>

      {/* スポット1のチェックイン */}
      <div>
        <p>Spot 1 Check-In Status: {isVisited1 ? "Visited" : "Not Visited"}</p>
        <button onClick={() => checkIn(spotId1)}>Check-In at Spot 1</button>
      </div>

      {/* スポット2のチェックイン */}
      <div>
        <p>Spot 2 Check-In Status: {isVisited2 ? "Visited" : "Not Visited"}</p>
        <button onClick={() => checkIn(spotId2)}>Check-In at Spot 2</button>
      </div>
    </div>
  );
}
