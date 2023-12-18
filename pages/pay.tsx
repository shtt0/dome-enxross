import { useAddress, useContract } from "@thirdweb-dev/react";
import Container from "../components/Container/Container";
import { NFT_COLLECTION_ADDRESS } from "../const/contractAddresses";
import { PolygonZkevmTestnet } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import PaymentForm from "../components/DcPay/calculator.js"; // PaymentFormコンポーネントを正しいファイルパスと拡張子でインポートする
import TransactionHistory from "../components/DcPay/shopClaim.js";
import ShopClaim from "../components/DcPay/ClaimButton.js"; // ShopClaimコンポーネントを正しいファイルパスと拡張子でインポートする

export default function App() {
  // Load all of the NFTs from the NFT Collection
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const address = useAddress();

  return (
    <Container maxWidth="lg">
      <h1>DCトークンによる決済を行います。</h1>
      <h3>まず、税込みの合計金額を入力</h3>
      <PaymentForm />
    </Container>
  );
}
