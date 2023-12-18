import React, { useState, useEffect } from "react";
import { useAddress, Web3Button } from "@thirdweb-dev/react";
import axios from "axios";
import Container from "../components/Container/Container";
import PoolHistory from "../components/DcPay/PoolHistory";

const contractAddress = "0x4c4E69e1ea1150B8CB23079A92E7b7584B6B0BF3";
const apiKey = "Q6756RMH3EAFENYWWIF6AJ889RG48XDU3Q";
// const excludedAddresses = [
//   "0xdaf5f57262fd76972d73c3305247e9169952493b",
//   "0x8AFC7416b8BeC18821E083d8b143Ae75EEF5da7d",
// ]; // POOLアドレス他
const excludedAddress = "0xdaf5f57262fd76972d73c3305247e9169952493b"; // POOLアドレス他

function TokenTransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const userAddress = useAddress();

  useEffect(() => {
    const fetchTokenTransactions = async () => {
      try {
        const response = await axios.get(
          `https://api-testnet-zkevm.polygonscan.com/api`,
          {
            params: {
              module: "account",
              action: "tokentx",
              contractaddress: contractAddress,
              address: userAddress,
              page: 1,
              offset: 5,
              sort: "desc",
              apikey: apiKey,
            },
          }
        );

        if (response.data && response.data.status === "1") {
          // 特定のアドレスからの入金を除外
          const filteredTransactions = response.data.result.filter(
            (transaction) =>
              transaction.from.toLowerCase() !== excludedAddress.toLowerCase()
          );

          setTransactions(filteredTransactions);
        }
      } catch (error) {
        console.error("Error fetching token transactions:", error);
      }
    };

    if (userAddress) {
      fetchTokenTransactions();
    }
  }, [userAddress]);

  const schedule = [
    { sectionId: 1, day: "Monday", startHour: 0, endHour: 3 },
    { sectionId: 2, day: "Monday", startHour: 3, endHour: 6 },
    { sectionId: 3, day: "Monday", startHour: 6, endHour: 9 },
    { sectionId: 4, day: "Monday", startHour: 9, endHour: 12 },
    { sectionId: 5, day: "Monday", startHour: 12, endHour: 15 },
    { sectionId: 6, day: "Monday", startHour: 15, endHour: 18 },
    { sectionId: 7, day: "Monday", startHour: 18, endHour: 21 },
    { sectionId: 8, day: "Monday", startHour: 21, endHour: 24 },
    { sectionId: 9, day: "Tuesday", startHour: 0, endHour: 3 },
    { sectionId: 10, day: "Tuesday", startHour: 3, endHour: 6 },
    { sectionId: 11, day: "Tuesday", startHour: 6, endHour: 9 },
    { sectionId: 12, day: "Tuesday", startHour: 9, endHour: 12 },
    { sectionId: 13, day: "Tuesday", startHour: 12, endHour: 15 },
    { sectionId: 14, day: "Tuesday", startHour: 15, endHour: 18 },
    { sectionId: 15, day: "Tuesday", startHour: 18, endHour: 21 },
    { sectionId: 16, day: "Tuesday", startHour: 21, endHour: 24 },
    { sectionId: 17, day: "Wednesday", startHour: 0, endHour: 3 },
    { sectionId: 18, day: "Wednesday", startHour: 3, endHour: 6 },
    { sectionId: 19, day: "Wednesday", startHour: 6, endHour: 9 },
    { sectionId: 20, day: "Wednesday", startHour: 9, endHour: 12 },
    { sectionId: 21, day: "Wednesday", startHour: 12, endHour: 15 },
    { sectionId: 22, day: "Wednesday", startHour: 15, endHour: 18 },
    { sectionId: 23, day: "Wednesday", startHour: 18, endHour: 21 },
    { sectionId: 24, day: "Wednesday", startHour: 21, endHour: 24 },
    { sectionId: 25, day: "Thursday", startHour: 0, endHour: 3 },
    { sectionId: 26, day: "Thursday", startHour: 3, endHour: 6 },
    { sectionId: 27, day: "Thursday", startHour: 6, endHour: 9 },
    { sectionId: 28, day: "Thursday", startHour: 9, endHour: 12 },
    { sectionId: 29, day: "Thursday", startHour: 12, endHour: 15 },
    { sectionId: 30, day: "Thursday", startHour: 15, endHour: 18 },
    { sectionId: 31, day: "Thursday", startHour: 18, endHour: 21 },
    { sectionId: 32, day: "Thursday", startHour: 21, endHour: 24 },
    { sectionId: 33, day: "Friday", startHour: 0, endHour: 3 },
    { sectionId: 34, day: "Friday", startHour: 3, endHour: 6 },
    { sectionId: 35, day: "Friday", startHour: 6, endHour: 9 },
    { sectionId: 36, day: "Friday", startHour: 9, endHour: 12 },
    { sectionId: 37, day: "Friday", startHour: 12, endHour: 15 },
    { sectionId: 38, day: "Friday", startHour: 15, endHour: 18 },
    { sectionId: 39, day: "Friday", startHour: 18, endHour: 21 },
    { sectionId: 40, day: "Friday", startHour: 21, endHour: 24 },
    { sectionId: 41, day: "Saturday", startHour: 0, endHour: 3 },
    { sectionId: 42, day: "Saturday", startHour: 3, endHour: 6 },
    { sectionId: 43, day: "Saturday", startHour: 6, endHour: 9 },
    { sectionId: 44, day: "Saturday", startHour: 9, endHour: 12 },
    { sectionId: 45, day: "Saturday", startHour: 12, endHour: 15 },
    { sectionId: 46, day: "Saturday", startHour: 15, endHour: 18 },
    { sectionId: 47, day: "Saturday", startHour: 18, endHour: 21 },
    { sectionId: 48, day: "Saturday", startHour: 21, endHour: 24 },
    { sectionId: 49, day: "Sunday", startHour: 0, endHour: 3 },
    { sectionId: 50, day: "Sunday", startHour: 3, endHour: 6 },
    { sectionId: 51, day: "Sunday", startHour: 6, endHour: 9 },
    { sectionId: 52, day: "Sunday", startHour: 9, endHour: 12 },
    { sectionId: 53, day: "Sunday", startHour: 12, endHour: 15 },
    { sectionId: 54, day: "Sunday", startHour: 15, endHour: 18 },
    { sectionId: 55, day: "Sunday", startHour: 18, endHour: 21 },
    { sectionId: 56, day: "Sunday", startHour: 21, endHour: 24 },
  ];
  const getSectionIdFromTimestamp = (timestamp) => {
    const transactionDate = new Date(timestamp * 1000);
    const transactionDay = transactionDate.toLocaleString("en-US", {
      weekday: "long",
    });
    const transactionHour = transactionDate.getHours();

    // スケジュールから該当のセクションを見つける
    const section = schedule.find(
      (item) =>
        item.day === transactionDay &&
        transactionHour >= item.startHour &&
        transactionHour < item.endHour
    );

    return section ? section.sectionId : null;
  };

  return (
    <Container maxWidth="lg">
      <h2>DCトークンによる売上履歴</h2>
      <table>
        <thead>
          <tr>
            <th>TxID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Payment Amount</th>
            <th>差額請求</th>
            {/* <th>状態</th> */}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            const sectionId = getSectionIdFromTimestamp(transaction.timeStamp);
            return (
              <tr key={transaction.hash}>
                <td>{transaction.hash}</td>
                <td>{Math.floor(transaction.value / 1e18)}</td>
                <td>
                  {new Date(transaction.timeStamp * 1000).toLocaleString(
                    "ja-JP"
                  )}
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Payment Amount"
                    onChange={(e) =>
                      (transaction.paymentAmount = e.target.value)
                    }
                  />
                </td>
                <td>
                  <Web3Button
                    contractAddress="0xDAF5F57262FD76972d73C3305247e9169952493b"
                    action={(contract) => {
                      contract.call("adjustTokenValue", [
                        transaction.paymentAmount,
                        userAddress,
                        transaction.hash,
                        sectionId,
                      ]);
                    }}
                  >
                    差額の請求
                  </Web3Button>
                </td>
                <td>{/* トランザクションの状態を表示 */}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <PoolHistory></PoolHistory>
    </Container>
  );
}

export default TokenTransactionHistory;
