import {
  useAddress,
  useContract,
  useOwnedNFTs,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Container from "../../components/Container/Container";
import ListingWrapper from "../../components/ListingWrapper/ListingWrapper";
import NFTGrid from "../../components/NFT/NFTGrid";
import Skeleton from "../../components/Skeleton/Skeleton";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../../const/contractAddresses";
import styles from "../../styles/Profile.module.css";
import TokenBalance from "../../components/tokenBalance.js";
import GetRate from "../../components/GetRate.js";

export default function ProfilePage() {
  const router = useRouter();
  const [tab, setTab] = useState<
    "nfts" | "Issued NFTs(Dao Member Only)" | "Token Balance" | "listings"
  >("nfts");

  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);
  const address = router.query.address as string; // アカウントアドレスを取得

  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: ownedNfts, isLoading: loadingOwnedNfts } = useOwnedNFTs(
    nftCollection,
    router.query.address as string
  );

  const { data: directListings, isLoading: loadingDirects } =
    useValidDirectListings(marketplace, {
      seller: router.query.address as string,
    });

  const { data: auctionListings, isLoading: loadingAuctions } =
    useValidEnglishAuctions(marketplace, {
      seller: router.query.address as string,
    });

  return (
    <Container maxWidth="lg">
      <div className={styles.profileHeader}>
        <h1 className={styles.profileName}>
          {router.query.address ? (
            router.query.address.toString().substring(0, 4) +
            "..." +
            router.query.address.toString().substring(38, 42)
          ) : (
            <Skeleton width="320" />
          )}
        </h1>
      </div>

      <div className={styles.tabs}>
        <h3
          className={`${styles.tab} 
        ${tab === "nfts" ? styles.activeTab : ""}`}
          onClick={() => setTab("nfts")}
        >
          Owned NFTs
        </h3>
        <h3
          className={`${styles.tab} 
        ${tab === "Issued NFTs(Dao Member Only)" ? styles.activeTab : ""}`}
          onClick={() => setTab("Issued NFTs(Dao Member Only)")}
        >
          Issued NFTs(Dao Member Only)
        </h3>
        <h3
          className={`${styles.tab} 
        ${tab === "Token Balance" ? styles.activeTab : ""}`}
          onClick={() => setTab("Token Balance")}
        >
          Token Balance
        </h3>
        {/* <h3
          className={`${styles.tab} 
        ${tab === "listings" ? styles.activeTab : ""}`}
          onClick={() => setTab("listings")}
        >
          Listings
        </h3> */}
      </div>

      <div
        className={`${
          tab === "nfts" ? styles.activeTabContent : styles.tabContent
        }`}
      >
        <NFTGrid
          data={ownedNfts}
          isLoading={loadingOwnedNfts}
          emptyText="Looks like you don't have any NFTs from this collection. Head to the buy page to buy some!"
        />
      </div>

      <div
        className={`${
          tab === "listings" ? styles.activeTabContent : styles.tabContent
        }`}
      >
        {loadingDirects ? (
          <p>Loading...</p>
        ) : directListings && directListings.length === 0 ? (
          <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
        ) : (
          directListings?.map((listing) => (
            <ListingWrapper listing={listing} key={listing.id} />
          ))
        )}
      </div>

      <div
        className={`${
          tab === "Token Balance" ? styles.activeTabContent : styles.tabContent
        }`}
      >
        <h3>Token Balance（DCトークン）</h3>
      </div>
      <div
        className={`${
          tab === "Token Balance" ? styles.activeTabContent : styles.tabContent
        }`}
      >
        <TokenBalance account={address}></TokenBalance>
      </div>
      <div
        className={`${
          tab === "Token Balance" ? styles.activeTabContent : styles.tabContent
        }`}
      >
        <h3>現在のプレミア率（DCトークン）※3時間毎に更新</h3>
      </div>
      <div
        className={`${
          tab === "Token Balance" ? styles.activeTabContent : styles.tabContent
        }`}
      >
        <h2>
          <GetRate></GetRate>
        </h2>
      </div>
    </Container>
  );
}
