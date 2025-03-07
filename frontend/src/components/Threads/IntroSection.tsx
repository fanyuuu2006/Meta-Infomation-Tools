import "@/styles/Index/IntroSection.css";
import React from "react";
import { useRouter } from "next/navigation";
import { Space, Button } from "antd";

import { OutsideLink } from "../common/OutsideLink";
import { HomeOutlined} from "@ant-design/icons";
import { FaThreads } from "react-icons/fa6";

export const IntroSection = () => {
  const router = useRouter();
  return (
    <section>
      <Space
        direction="vertical"
        align="start"
        wrap={false}
        className="IntroSection-Div"
        size="small"
      >
        <div className="IntroSection-Title Title">
          With Threads <FaThreads />
        </div>
        <div className="Title BottomLine">使用方式 ( 舉例 )</div>
        <ul className="IntroSection-List Content">
          <li>
            1. 前往{" "}
            <OutsideLink href="https://accountscenter.instagram.com/">
              Meta 帳號管理中心
            </OutsideLink>
          </li>
          <li>
            2. 找到{" "}
            <OutsideLink href="https://accountscenter.instagram.com/info_and_permissions/">
              你的資訊和權限
            </OutsideLink>{" "}
            頁面
          </li>
          <li>
            3. 點擊{" "}
            <OutsideLink href="https://accountscenter.instagram.com/info_and_permissions/dyi">
              下載資訊
            </OutsideLink>
            {" > "}下載或轉移資訊{" > "}選擇要下載的帳號{" > "}部分資訊{" > "}
            勾選 <mark>Threads</mark>
            {" > "}下載到裝置{" > "}選擇日期範圍 <mark>所有時間</mark>
            {" > "}選擇格式 <mark>JSON</mark>
          </li>
          <li>4. 收到資料已準備完成的電子郵件後 前往下載 ZIP 檔案</li>
          <li>5. 解壓縮檔案 並且根據需求將檔案上傳至此網站</li>
        </ul>
        <div className="Title BottomLine">資料隱私政策</div>
        <div className="IntroSection-Content Content">
          此網站僅提供搜尋功能
          <br />
          不會保留任何使用者相關資訊
        </div>
        <div className="IntroSection-Button-Div Label">
          <Button
            type="default"
            onClick={() => {
              router.push("/");
            }}
            icon= {<HomeOutlined/>}
          >
            返回主頁
          </Button>
        </div>
      </Space>
    </section>
  );
};
