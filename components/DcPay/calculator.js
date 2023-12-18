import { useState, useEffect } from "react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import QRCode from "qrcode.react";

function PaymentForm() {
  const [totalAmount, setTotalAmount] = useState(0); // 合計金額
  const [customerAmount, setCustomerAmount] = useState(0); // 客が支払うべき金額
  const [adjustmentAmount, setAdjustmentAmount] = useState(0); // 店舗に送付する差額
  const [sectionId, setSectionId] = useState(null); // セクションID
  const contractAddress = "0x0a0739508D3ec4592e84050BC16c462222E93898";
  const { contract } = useContract(contractAddress);
  const contractData = useContractRead(contract, "getRate", [sectionId]);
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
  const chainId = "1442";
  const tokenContractAddress = "0x4c4E69e1ea1150B8CB23079A92E7b7584B6B0BF3"; // トークンのコントラクトアドレス
  const address = useAddress(); // ログイン中のユーザーのアドレスを取得
  const [showQR, setShowQR] = useState(false); // QRコード表示状態

  // 合計金額が変更されたときにセクションIDを取得
  useEffect(() => {
    // セクションIDを取得するロジックを実装
    const getCurrentSectionId = () => {
      const currentDate = new Date();
      const currentDay = currentDate.toLocaleString("en-US", {
        weekday: "long",
      });
      const currentHour = currentDate.getHours();

      // スケジュールから該当のセクションを見つける
      const section = schedule.find(
        (item) =>
          item.day === currentDay &&
          currentHour >= item.startHour &&
          currentHour < item.endHour
      );

      return section ? section.sectionId : null;
    };
    const newSectionId = getCurrentSectionId(); // 関数を宣言の後に呼び出す
    setSectionId(newSectionId);
  }, [totalAmount]);

  useEffect(() => {
    if (sectionId !== null && contractData?.data) {
      // contractData から rate を取得し、customerAmount を計算
      const rate = contractData.data;
      const calculatedCustomerAmount = Math.floor((totalAmount * 100) / rate);
      const calculatedAdjustmentAmount = Math.ceil(
        totalAmount - calculatedCustomerAmount
      );

      setCustomerAmount(calculatedCustomerAmount);
      setAdjustmentAmount(calculatedAdjustmentAmount);
    }
  }, [totalAmount, sectionId, contractData]);

  // 合計金額フォームの変更ハンドラ
  const handleTotalAmountChange = (event) => {
    const newTotalAmount = parseFloat(event.target.value);
    setTotalAmount(newTotalAmount);
  };

  // QRコード表示トグル関数
  const toggleQRCode = () => {
    setShowQR(!showQR);
  };

  // トークン支払い用のURIスキームを生成
  // const paymentUri = `ethereum:${address}?value=${
  //   customerAmount * Math.pow(10, 18)
  // }&contractAddress=${tokenContractAddress}&chainId=${chainId}`;

  const paymentUri = `ethereum:${address}`;

  return (
    <div>
      <div>
        <label>Total Amount:</label>
        <input
          type="number"
          value={totalAmount}
          onChange={(event) => setTotalAmount(parseFloat(event.target.value))}
        />
        <div>
          <h1>お客様の支払い金額（プレミア率換算済）: {customerAmount}</h1>
        </div>
        <div>
          <h2>Adjustment Amount: {adjustmentAmount} ※POS画面で差額請求</h2>
        </div>
      </div>

      <div>
        <button onClick={toggleQRCode}>決済用QRを表示</button>
        {showQR && (
          <div style={{ marginTop: "20px" }}>
            <QRCode
              value={paymentUri}
              size={256}
              level={"H"}
              includeMargin={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentForm;
