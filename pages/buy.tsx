import { ThirdwebNftMedia, useContract, useNFTs } from "@thirdweb-dev/react";
import React, { useState, useEffect } from "react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
// import PlanGrid from "../components/NFT/PlanGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";

export default function Buy() {
  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(contract);

  // データのロード状態を管理する状態変数
  // const [isDataLoaded, setIsDataLoaded] = useState(false);

  // データが正しくロードされたかどうかを確認
  // useEffect(() => {
  //   if (!isLoading && data) {
  //     setIsDataLoaded(true);
  //   }
  // }, [isLoading, data]);

  // NFTのIDを逆順にソート
  // const reversedData = isDataLoaded ? [...data].reverse() : [];

  return (
    <Container maxWidth="lg">
      <h1>モデルプランNFTを入手する。</h1>
      <p>※検索、ソート機能は今後実装されます。</p>
      <NFTGrid
        // <PlanGrid
        data={data}
        // data={reversedData}
        isLoading={isLoading}
        emptyText={
          "Looks like there are no NFTs in this collection. Did you import your contract on the thirdweb dashboard? https://thirdweb.com/dashboard"
        }
      />
    </Container>
  );
}
