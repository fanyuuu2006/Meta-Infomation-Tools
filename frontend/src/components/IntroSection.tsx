import "@/styles/Index/IntroSection.css";
import React from "react";
import Image from "next/image";
import { Space } from "antd";
import { CheckSquareOutlined, InstagramOutlined } from "@ant-design/icons";

import { OutsideLink } from "./common/OutsideLink";

const GitHubBadges: {
  name: string;
  href?: string;
  src: string;
  width: number;
  height: number;
}[] = [
  {
    name: "GitHub 儲存庫",
    href: "https://github.com/fanyuuu2006/IG-Tools.git",
    src: "https://img.shields.io/badge/Github-demo?style=flat-square&logo=github&color=%23000",
    width: 60,
    height: 18,
  },
  {
    name: "最近提交",
    src: "https://img.shields.io/github/last-commit/fanyuuu2006/IG-Tools?style=flat-square",
    width: 100,
    height: 18,
  },
  {
    name: "創建於",
    src: "https://img.shields.io/github/created-at/fanyuuu2006/IG-Tools?style=flat-square",
    width: 125,
    height: 18,
  },
  {
    name: "星星",
    src: "https://img.shields.io/github/stars/fanyuuu2006/IG-Tools?style=flat-square",
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
  "查看您開始追蹤某個用戶的詳細時間",
  "比較粉絲與追蹤名單 篩選出 尚未回追你 or 你尚未回追 的用戶",
];

export const IntroSection = () => {
  return (
    <section>
      <Space
        direction="vertical"
        align="start"
        wrap={false}
        className="IntroSection-Div"
        size="small"
      >
        <div className="Title BottomLine">
          Instagram Tools By Fan-Yu <InstagramOutlined />
        </div>
        <div className="IntroSection-Badge-Div">
          {GitHubBadges.map((badge, index) => {
            const image = (
              <Image
                alt={badge.name}
                title={badge.name}
                src={badge.src}
                width={badge.width}
                height={badge.height}
                unoptimized
              />
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
        <div className="IntroSection-Intro Content">
          此網站是提供一些工具
          <br />
          用於整理{" "}
          <OutsideLink href="https://accountscenter.instagram.com/">
            Meta 帳號管理中心
          </OutsideLink>
          提供的可下載資訊。
        </div>
        <div className="IntroSection-Feature">
          <div className="Title BottomLine">功能</div>
          <div className="IntroSection-Feature-List">
            <ul className="Content">
              {Features.map((feature, index) => {
                return (
                  <li key={index}>
                    <CheckSquareOutlined style={{backgroundColor:"#00BA00",color: "#FFFFFF"}}/> {feature}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Space>
    </section>
  );
};
