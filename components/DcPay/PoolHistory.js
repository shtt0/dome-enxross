import React, { useEffect, useState } from "react";
import axios from "axios";
import Container2 from "../Container/Container";
import { useAddress } from "@thirdweb-dev/react";

const contractAddress = "0x4c4E69e1ea1150B8CB23079A92E7b7584B6B0BF3";
const apiKey = "Q6756RMH3EAFENYWWIF6AJ889RG48XDU3Q";
const includedAddress = "0xdaf5f57262fd76972d73c3305247e9169952493b"; // POOLアドレス

function PoolHistory() {
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
              offset: 10,
              sort: "desc",
              apikey: apiKey,
            },
          }
        );

        if (response.data && response.data.status === "1") {
          // 特定のアドレスからの入金のみを表示
          const filteredTransactions = response.data.result.filter(
            (transaction) =>
              transaction.from.toLowerCase() === includedAddress.toLowerCase()
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

  // トランザクションを表示する
  return (
    <Container2 maxWidth="lg2">
      <h2>POOLからの差額分補填履歴</h2>
      <table>
        <thead>
          <tr>
            <th>TxID</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.hash}>
              <td>{transaction.hash}</td>
              <td>{Math.floor(transaction.value / 1e18)}</td>
              <td>
                {new Date(transaction.timeStamp * 1000).toLocaleString("ja-JP")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container2>
  );
}

export default PoolHistory;
