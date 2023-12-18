import { useState } from "react";
import { Web3Button } from "@thirdweb-dev/react";
import styles from "../styles/CheckInComponent.module.css"; // CSSモジュールのインポート

export default function CheckInComponent() {
  const [tokenId, setTokenId] = useState("");
  const [spotId, setSpotId] = useState("");

  const handleCheckIn = (contract) => {
    contract.call("checkIn", [tokenId, spotId]);
  };

  return (
    <div>
      <input
        className={styles.inputField} // スタイルを適用
        type="text"
        placeholder="Enter Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <input
        className={styles.inputField} // スタイルを適用
        type="text"
        placeholder="Enter Spot ID"
        value={spotId}
        onChange={(e) => setSpotId(e.target.value)}
      />
      <Web3Button
        className={styles.web3ButtonHover} // カスタムクラスの適用
        contractAddress="0x09Cea87151Af343b7C26a0EDD5E6d3dE90865fa1"
        action={handleCheckIn}
      >
        Check In
      </Web3Button>
    </div>
  );
}
