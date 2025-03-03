import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "飯魚的 IG 工具",
  description: "想要處理你的 IG 相關資訊嗎?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
