import "./global.css";

import { ColorSchemeScript } from '@mantine/core';

import Provider from './provider';
import Shell from "./components/shell";

// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "letsvote",
    description: "letsvote app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Provider>
          <Shell>{children}</Shell>
        </Provider>
      </body>
    </html>
  );
}
