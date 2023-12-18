import React, { useState, useEffect } from 'react';
import { useContractRead, Web3Button } from "@thirdweb-dev/react";
import axios from 'axios'; // Axiosをインポート

const contractAddress = '0x4c4E69e1ea1150B8CB23079A92E7b7584B6B0BF3'; // ERC20トークンのコントラクトアドレス
const apiKey = 'Q6756RMH3EAFENYWWIF6AJ889RG48XDU3Q'; // APIキー（必要に応じて設定）

function TokenTransactionHistory({ userAddress }) {
  const [transactions, setTransactions] = useState([]);

  // ERC20トークンの送金履歴を取得する関数
  const fetchTokenTransactions = async () => {
    try {
      // APIエンドポイントのURLを構築
      const apiUrl = `https://api-testnet-zkevm.polygonscan.com/api?module=account&action=tokentx&contractaddress=${contractAddress}&address=${userAddress}&startblock=0&endblock=99999999&page=1&offset=5&sort=asc&apikey=${apiKey}`;

      // APIを呼び出してデータを取得
      const response = await axios.get(apiUrl);

      // データを取得したら、データをセット
      if (response.data && response.data.result) {
        setTransactions(response.data.result);
      }
    } catch (error) {
      console.error('Error fetching token transactions:', error);
    }
  };

  useEffect(() => {
    fetchTokenTransactions();
  }, []); // コンポーネントがマウントされたときに実行

  // 差額請求のハンドラ
  const handleAdjustTokenValue = (transactionId) => {
    // 差額請求のロジックを実装
    // transactionIdを使用して対応するトランザクションを処理する必要があります
  };

  return (
    <div>
      <h2>Token Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>TxID</th>
            <th>トークン量</th>
            <th>差額請求</th>
            <th>状態</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.hash}>
              <td>{transaction.hash}</td>
              <td>{transaction.value}</td>
              <td>
                <Web3Button
                  contractAddress={contractAddress}
                  action={() => handleAdjustTokenValue(transaction.hash)}
                  disabled={transaction.status === 'Processed'}
                >
                  Adjust Token Value
                </Web3Button>
              </td>
              <td>{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TokenTransactionHistory;
