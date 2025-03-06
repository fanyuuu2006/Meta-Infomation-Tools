import type { Metadata } from "next";
import { Footer } from "@/components/common/Footer";
import "@/styles/globals.css";
import "antd/dist/reset.css"; // antd v5 的全局樣式

export const metadata: Metadata = {
  title: "Meta 資訊工具",
  description: "處理你的 Meta 應用程式資訊嗎?",
  icons: "/logo.ico",
};

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
