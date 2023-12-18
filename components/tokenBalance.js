import React from "react";
import { useContract, useAddress, useContractRead } from "@thirdweb-dev/react";

function TokenBalance({ account }) {
  const address = useAddress(); // ログインしているユーザーのアドレスを取得
  const { contract } = useContract(
    "0x4c4E69e1ea1150B8CB23079A92E7b7584B6B0BF3"
  );
  const { data, isLoading } = useContractRead(contract, "balanceOf", [address]);

  // WeiからEtherに変換する関数
  const formatBalance = (balance) => {
    // BigNumber型のデータを数値に変換し、1e18で割る
    const number = Number(balance) / 1e18;
    // 小数点以下3桁に丸める
    return number.toFixed(0);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{data && <h1> {formatBalance(data)} </h1>}</div>;
}
export default TokenBalance;
