import { Web3Button } from "@thirdweb-dev/react";
import React, { useState } from "react";

export default function Component() {
  // tokenID と spotID の初期値を設定
  const [tokenId, setTokenId] = useState(1);
  const [spotId, setSpotId] = useState(1);

  const handleTokenIdChange = (event) => {
    // 入力フィールドでのtokenIDの変更をキャッチ
    setTokenId(Number(event.target.value));
  };

  const handleSpotIdChange = (event) => {
    // 入力フィールドでのspotIDの変更をキャッチ
    setSpotId(Number(event.target.value));
  };

  return (
    <div>
      <label>
        Token ID:
        <input type="number" value={tokenId} onChange={handleTokenIdChange} />
      </label>
      <br />
      <label>
        Spot ID:
        <input type="number" value={spotId} onChange={handleSpotIdChange} />
      </label>
      <br />
      <Web3Button
        contractAddress="0x09Cea87151Af343b7C26a0EDD5E6d3dE90865fa1"
        action={(contract) => {
          // 入力された tokenId と spotId を使って checkIn 関数を呼び出す
          contract
            .call("checkIn", [tokenId, spotId])
            .then((result) => {
              // チェックインが成功した場合の処理
              console.log("Check-in successful!");
            })
            .catch((error) => {
              // チェックインが失敗した場合のエラーハンドリング
              console.error("Check-in failed:", error);
            });
        }}
      >
        Check In
      </Web3Button>
    </div>
  );
}
