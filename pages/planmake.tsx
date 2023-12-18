import { useAddress, useContract } from "@thirdweb-dev/react";
import Container from "../components/Container/Container";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";
import { PolygonZkevmTestnet } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import PlanMake from "../components/PlanMake"; // PlanMakeコンポーネントを正しいファイルパスと拡張子でインポートする

export default function App() {
  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const address = useAddress();

  return (
    <Container maxWidth="lg">
      <h1>プランNFTを登録する。</h1>
      <PlanMake /> {/* PlanMakeコンポーネントを追加 */}
    </Container>
  );
}
