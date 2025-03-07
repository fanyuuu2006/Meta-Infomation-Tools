import type { Metadata } from "next";
import { Footer } from "@/components/common/Footer";
import "@/styles/globals.css";
import "antd/dist/reset.css"; // antd v5 的全局樣式

export const metadata: Metadata = {
  title: "Meta 資訊處理工具",
  description: "處理你的 Meta 應用程式資訊",
  authors: [
    { name: "范余" },
    { name: "范余振富" },
    { name: "飯魚" },
    { name: "飯魚正負" },
  ], // 網頁作者
  keywords: [
    "Meta",
    "Instagram",
    "IG",
    "哀居",
    "Threads",
    "脆",
    "粉絲追蹤",
    "追蹤",
    "摯友",
    "回追",
    "退追移粉",
    "飯魚",
    "誰沒回追我",
    "回追",
    "查看",
    "下載資訊",
    "資訊工具",
    "資訊處理工具",
    "網站工具",
  ], // 關鍵字
  icons: "/logo.ico",
  robots: "index, follow", // 允許搜尋引擎索引頁面並跟蹤鏈接

  // Open Graph 設定
  openGraph: {
    title: "Meta 資訊工具", // 分享時顯示的標題
    description: "處理你的 Meta 應用程式資訊", // 分享時顯示的描述
    url: "https://meta-infomation-tools.vercel.app/",
    siteName: "Meta 資訊工具", // 網站名稱
    locale: "zh_TW",
    images: [
      {
        url: "/logo.webp", // 分享時顯示的圖片
        width: 800,
        height: 600,
        alt: "Meta Logo",
      },
    ],
    type: "website",  // 網站類型
  },

  // Twitter Card 設定
  twitter: {
    card: "summary_large_image", // 顯示較大的圖片卡片
    title: "Meta 資訊工具",
    description: "處理你的 Meta 應用程式資訊",
    images: "/logo.webp", // Twitter 卡片的圖片
  },
};

// viewport 設置
export const viewport = "width=device-width, initial-scale=1.0";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="zh-TW">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
