import React from 'react';
import '@/app/globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin']});

export const metadata ={
  title: 'SNSスカウター',
  description: 'あなたのSNS戦闘力を測定しよう！',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'black'},
    { media: '(prefers-color-scheme: dark)', color: 'black'},
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/Saiyan-Sans.ttf"
        as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
        >
          {/*背景エフェクト */}
          <div className="absolute inset-0 -z-20">
            <div className="grid-lines"></div>
            <div className="particles"></div>
          </div>
          <div className="relative -z-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
