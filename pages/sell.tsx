import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import React, { useState, useEffect } from "react";
import Container from "../components/Container/Container";
import NFTGrid from "../components/NFT/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";
import tokenPageStyles from "../styles/Token.module.css";
import { NFT as NFTType } from "@thirdweb-dev/sdk";
import SaleInfo from "../components/SaleInfo/SaleInfo";

export default function Sell() {
  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const address = useAddress();
  const { data, isLoading } = useOwnedNFTs(contract, address);

  const [selectedNft, setSelectedNft] = useState<NFTType>();

  // データのロード状態を管理する状態変数
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // データが正しくロードされたかどうかを確認
  useEffect(() => {
    if (!isLoading && data) {
      setIsDataLoaded(true);
    }
  }, [isLoading, data]);

  // NFTのIDを逆順にソート
  const reversedData = isDataLoaded ? [...data].reverse() : [];

  return (
    <Container maxWidth="lg">
      <h1>モデルプランNFTを入手する。</h1>
      {!selectedNft ? (
        <>
          <p>※検索、ソート機能は今後実装されます。</p>
          <NFTGrid
            // data={data}
            data={reversedData}
            isLoading={isLoading}
            overrideOnclickBehavior={(nft) => {
              setSelectedNft(nft);
            }}
            emptyText={
              "Looks like you don't own any NFTs in this collection. Head to the buy page to buy some!"
            }
          />
        </>
      ) : (
        <div className={tokenPageStyles.container} style={{ marginTop: 0 }}>
          <div className={tokenPageStyles.metadataContainer}>
            <div className={tokenPageStyles.imageContainer}>
              <ThirdwebNftMedia
                metadata={selectedNft.metadata}
                className={tokenPageStyles.image}
              />
              <button
                onClick={() => {
                  setSelectedNft(undefined);
                }}
                className={tokenPageStyles.crossButton}
              >
                X
              </button>
            </div>
          </div>

          <div className={tokenPageStyles.listingContainer}>
            <p>You&rsquo;re about to list the following item for sale.</p>
            <h1 className={tokenPageStyles.title}>
              {selectedNft.metadata.name}
            </h1>
            <p className={tokenPageStyles.collectionName}>
              Token ID #{selectedNft.metadata.id}
            </p>

            <div className={tokenPageStyles.pricingContainer}>
              <SaleInfo nft={selectedNft} />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
