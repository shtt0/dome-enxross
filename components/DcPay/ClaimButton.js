import { Web3Button } from "@thirdweb-dev/react";

export default function ShopClaim() {
  return (
    <Web3Button
      contractAddress="0xDAF5F57262FD76972d73C3305247e9169952493b"
      action={(contract) => {
        contract.call("adjustTokenValue", [
          paymentAmount,
          storeAddress,
          transactionId,
          sectionId,
        ]);
      }}
    >
      差額の請求
    </Web3Button>
  );
}
