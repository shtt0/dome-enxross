import React from "react";
import {
  useContract,
  useLazyMint,
  Web3Button,
  useAddress,
} from "@thirdweb-dev/react";
import { useState } from "react"; // useState を追加
import styles from "../styles/PlanMake.module.css";

const contractAddress = "0xa3154E1eaaf786AD76320d5D9896BCB5C40fe2Ea";

function PlanMake() {
  const { contract } = useContract(contractAddress);
  const { mutateAsync: lazyMint, isLoading, error } = useLazyMint(contract);
  const userAddress = useAddress(); //

  // 初期のテンプレート文字列を定義
  const initialTemplate = `{
    "name": "",
    "description": "",
    "category": "",
    "image": "",
    "external_url": "",
    "youtube_url": "",
    "daoMember": "0x8d77B4E72c5aec74d24176BB8dC21843dCFc6e54",
    "attributes": [
      {
        "trait_type": "",
        "value": "未訪問"
      },
      {
        "trait_type": "",
        "value": "未訪問"
      }
    ],
    "tokenAmount": "100"
  }`;

  const [metadata, setMetadata] = useState(JSON.parse(initialTemplate)); // メタデータの状態変数

  const handleLazyMint = () => {
    try {
      // Lazy Mint アクションを実行
      lazyMint({
        metadatas: [metadata],
      });
    } catch (error) {
      // エラーハンドリング
      console.error("Invalid metadata format", error);
    }
  };

  const handleMetadataChange = (selectedValue, field) => {
    const updatedMetadata = { ...metadata, [field]: selectedValue };
    setMetadata(updatedMetadata);
  };

  const handleTokenAmountChange = (value) => {
    // 数値に変換し、1e18を乗算
    const numValue = Number(value);
    const updatedTokenAmount = isNaN(numValue) ? 0 : numValue * 1e18;
    // 更新されたmetadataをセット
    setMetadata({ ...metadata, tokenAmount: updatedTokenAmount.toString() });
  };

  return (
    <div className={styles.flexContainer}>
      <div className={styles.inputContainer}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={metadata.name}
            onChange={(e) => handleMetadataChange(e.target.value, "name")}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            id="description"
            value={metadata.description}
            onChange={(e) =>
              handleMetadataChange(e.target.value, "description")
            }
          ></textarea>
        </div>
        <div>
          <label>Category（一つ選ぶ）:</label>
          <select
            value={metadata.category}
            onChange={(e) => handleMetadataChange(e.target.value, "category")}
          >
            <option value="デート">デート</option>
            <option value="子連れ">子連れ</option>
            <option value="グループ">グループ</option>
            <option value="一人でも楽しめる">一人でも楽しめる</option>
            <option value="ゆったり">ゆったり</option>
            <option value="スポーティ">スポーティ</option>
          </select>
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            value={metadata.image}
            onChange={(e) => handleMetadataChange(e.target.value, "image")}
          />
        </div>
        <div>
          <label>External URL:</label>
          <input
            type="text"
            value={metadata.external_url}
            onChange={(e) =>
              handleMetadataChange(e.target.value, "external_url")
            }
          />
        </div>
        <div>
          <label>YouTube URL:</label>
          <input
            type="text"
            value={metadata.youtube_url}
            onChange={(e) =>
              handleMetadataChange(e.target.value, "youtube_url")
            }
          />
        </div>
        <div>
          <label>自身のアドレス※自動入力:</label>
          <input
            type="text"
            value={metadata.daoMember}
            onChange={(e) => handleMetadataChange(e.target.value, "daoMember")}
          />
        </div>
        <div>
          <label>訪問スポット（その１）:</label>
          <select
            value={metadata.attributes[0].trait_type}
            onChange={(e) => {
              const updatedAttributes = [...metadata.attributes];
              updatedAttributes[0] = {
                ...updatedAttributes[0],
                trait_type: e.target.value,
              };
              setMetadata({ ...metadata, attributes: updatedAttributes });
            }}
          >
            <option value="Spot1">東京ドーム</option>
            <option value="Spot2">Spa LaQua</option>
            <option value="Spot3">アトラクションズ</option>
            <option value="Spot4">東京ドームホテル</option>
            <option value="Spot5">ASOBono</option>
            <option value="Spot6">TaKuSuRu</option>
            <option value="Spot7">Gallery AaMo</option>
            <option value="Spot8">スポドリ</option>
            <option value="Spot9">シアターＧロッソ</option>
            <option value="Spot10">blue-ing</option>
          </select>
        </div>
        <div>
          <label>訪問スポット（その２）:</label>
          <select
            value={metadata.attributes[1].trait_type}
            onChange={(e) => {
              const updatedAttributes = [...metadata.attributes];
              updatedAttributes[1] = {
                ...updatedAttributes[1],
                trait_type: e.target.value,
              };
              setMetadata({ ...metadata, attributes: updatedAttributes });
            }}
          >
            <option value="Spot1">東京ドーム</option>
            <option value="Spot2">Spa LaQua</option>
            <option value="Spot3">アトラクションズ</option>
            <option value="Spot4">東京ドームホテル</option>
            <option value="Spot5">ASOBono</option>
            <option value="Spot6">TaKuSuRu</option>
            <option value="Spot7">Gallery AaMo</option>
            <option value="Spot8">スポドリ</option>
            <option value="Spot9">シアターＧロッソ</option>
            <option value="Spot10">blue-ing</option>
          </select>
        </div>
        <div>
          <label>Token Amount※100DC:</label>
          <input
            type="text"
            value={metadata.tokenAmount * 1000000000000000000}
            onChange={(e) => handleTokenAmountChange(e.target.value)}
          />
        </div>
        <Web3Button
          contractAddress={contractAddress}
          action={handleLazyMint} // ボタンクリック時に handleLazyMint を呼び出す
          className={styles.button} // ボタンにスタイルを適用
        >
          Mint NFT
        </Web3Button>
      </div>
      <div className={styles.spotListContainer}>
        <p>＜スポット対応表＞</p>
        <p>Spot1: 東京ドーム</p>
        <p>Spot2: Spa LaQua</p>
        <p>Spot3: 東京ドームシティ アトラクションズ</p>
        <p>Spot4: 東京ドームホテル</p>
        <p>Spot5: ASOBono</p>
        <p>Spot6: TaKuSuRu</p>
        <p>Spot7: Gallery AaMo</p>
        <p>Spot8: スポドリ</p>
        <p>Spot9: シアターＧロッソ</p>
        <p>Spot10: blue-ing</p>
      </div>
    </div>
  );
}

export default PlanMake;
