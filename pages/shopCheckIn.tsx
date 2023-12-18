import { useAddress, useContract } from "@thirdweb-dev/react";
import Container from "../components/Container/Container";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";
import { PolygonZkevmTestnet } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import PlanMake from "../components/PlanMake"; // PlanMakeコンポーネントを正しいファイルパスと拡張子でインポートする
import CheckInComponent from "../components/shopCheckIn"; // CheckInComponentコンポーネントを正しいファイルパスと拡張子でインポートする

export default function App() {
  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const address = useAddress();

  return (
    <Container maxWidth="lg">
      <h1>訪問者のCheckIn対応を行う。</h1>
      <h2>（訪問履歴の表示は今後実装）</h2>
      <CheckInComponent />
    </Container>
  );
}
