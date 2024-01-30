// All packages except `@mantine/hooks` require styles imports
import "./global.css";

import { ColorSchemeScript } from '@mantine/core';

import Provider from './provider';
import Header from './components/header';
import Footer from './components/footer';

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <Provider>
            <Header/>
            <main>{children}</main>
            <Footer />
        </Provider>
      </body>
    </html>
  );
}
