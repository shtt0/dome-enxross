import { useState, useEffect } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";

function GetRate() {
  // セクションIDのスケジュールを定義
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

  // 現在の日時からセクションIDを決定
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

  // セクションIDのstateを初期化
  const [sectionId, setSectionId] = useState(getCurrentSectionId());

  const { contract } = useContract(
    "0x0a0739508D3ec4592e84050BC16c462222E93898"
  );

  const { data, isLoading } = useContractRead(contract, "getRate", [sectionId]);

  // セクションIDを定期的に更新
  useEffect(() => {
    const interval = setInterval(() => {
      const newSectionId = getCurrentSectionId();
      if (newSectionId !== sectionId) {
        setSectionId(newSectionId);
      }
    }, 1000 * 60 * 60); // 1時間ごとにセクションIDを更新

    return () => clearInterval(interval);
  }, [sectionId]);

  return (
    <div>
      {isLoading ? "Loading..." : data !== undefined ? `Rate: ${data}` : "N/A"}
    </div>
  );
}

export default GetRate;
