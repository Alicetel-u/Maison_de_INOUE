import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maison de INOUE | メゾン ド イノウエ — Private Hair Salon",
  description:
    "あなただけの、美しい光を。表参道の完全予約制プライベートヘアサロン Maison de INOUE（メゾン ド イノウエ）。一人ひとりの個性を引き出す、上質なヘアデザインをお届けします。",
  keywords: ["美容室", "ヘアサロン", "表参道", "プライベートサロン", "Maison de INOUE", "メゾン ド イノウエ"],
  openGraph: {
    title: "Maison de INOUE | メゾン ド イノウエ — Private Hair Salon",
    description: "あなただけの、美しい光を。表参道の完全予約制プライベートヘアサロン。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Serif+JP:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
