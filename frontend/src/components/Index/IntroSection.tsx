import "@/styles/Index/IntroSection.css";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Space, Button, Tooltip } from "antd";
import {
  CheckSquareOutlined,
  GithubOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

import { OutsideLink } from "../common/OutsideLink";
import { FaMeta, FaThreads } from "react-icons/fa6";

const GitHubBadges: {
  name: string;
  href?: string;
  src: string;
  width: number;
  height: number;
}[] = [
  {
    name: "GitHub 儲存庫",
    href: "https://github.com/fanyuuu2006/Meta-Infomation-Tools.git",
    src: "https://img.shields.io/badge/Github-demo?style=flat-square&logo=github&color=%23000",
    width: 60,
    height: 18,
  },
  {
    name: "最近提交",
    src: "https://img.shields.io/github/last-commit/fanyuuu2006/Meta-Infomation-Tools?style=flat-square",
    width: 100,
    height: 18,
  },
  {
    name: "創建於",
    src: "https://img.shields.io/github/created-at/fanyuuu2006/Meta-Infomation-Tools?style=flat-square",
    width: 100,
    height: 18,
  },
  {
    name: "星星",
    src: "https://img.shields.io/github/stars/fanyuuu2006/Meta-Infomation-Tools?style=flat-square",
    width: 45,
    height: 18,
  },
  {
    name: "部署",
    src: "https://img.shields.io/badge/deploy-Vercel-blue?style=flat-square",
    width: 80,
    height: 18,
  },
];

const Features: string[] = [
  "比較粉絲與追蹤名單 篩選出 尚未回追你 / 你尚未回追 的用戶",
  "查看 您開始追蹤某個用戶 / 用戶開始追蹤您 的詳細時間",
  "查看 與您互相追蹤的用戶",
  "查看 您的摯友 / 封鎖的用戶",
  "查看 最近申請追蹤 / 取消追蹤的用戶",
  '查看 被您移除的 "推薦用戶"',
];

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
        <div className="IntroSection-Title Title BottomLine">
          Tools For Meta Information
          <FaMeta />
        </div>
        <div className="IntroSection-Badge-Div IntroSection-Content">
          {GitHubBadges.map((badge, index) => {
            const image = (
              <Tooltip title={badge.name}>
                <Image
                  alt={badge.name}
                  src={badge.src}
                  width={badge.width}
                  height={badge.height}
                  unoptimized
                />
              </Tooltip>
            );

            return badge.href ? (
              <OutsideLink href={badge.href} key={index}>
                {image}
              </OutsideLink>
            ) : (
              <React.Fragment key={index}>{image}</React.Fragment>
            );
          })}
        </div>
        <div className="IntroSection-Content Content">
          此網站是提供一些工具
          <br />
          用於整理{" "}
          <OutsideLink href="https://accountscenter.instagram.com/">
            Meta 帳號管理中心
          </OutsideLink>
          提供的可下載資訊。{"( Instagram & Threads )"}
        </div>
        <div className="Title BottomLine">
          功能 <div className="Hint">{"(除了這些還有更多)"}</div>
        </div>
        <ul className="IntroSection-List Content">
          {Features.map((feature, index) => {
            return (
              <li key={index}>
                <CheckSquareOutlined
                  style={{ backgroundColor: "#00BA00", color: "#FFFFFF" }}
                />{" "}
                {feature}
              </li>
            );
          })}
        </ul>

        <div className="Title BottomLine">使用方式</div>
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
            {" > "}下載或轉移資訊{" > "}依照 <mark>需求</mark>{" "}
            並根據引導選擇要下載的檔案
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
        <div className="Title BottomLine">參考網站來源</div>
        <div className="IntroSection-Content Content">
          <OutsideLink href="https://xiang511.com/Instagram-Follow-Back-Tracker/zh-TW.html">
            IG 粉絲追蹤 Instagram-Follow-Back-Tracker
          </OutsideLink>
        </div>
        <div className="Title BottomLine">
          GitHub <GithubOutlined />
        </div>
        <div className="IntroSection-Content Content">
          歡迎前往{" "}
          <OutsideLink href="https://github.com/fanyuuu2006/Meta-Infomation-Tools">
            GitHub
          </OutsideLink>
          <br />
          查看我的其他專案
        </div>

        <div className="IntroSection-Button-Div Label">
          <Button
            type="default"
            onClick={() => {
              router.push("/Instagram");
            }}
            icon={<InstagramOutlined />}
          >
            Instagram
          </Button>
          <Button
            type="default"
            onClick={() => {
              router.push("/Threads");
            }}
            icon={<FaThreads />}
          >
            Threads
          </Button>
        </div>
      </Space>
    </section>
  );
};
