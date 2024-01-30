import "./global.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import Provider from "./provider";
import Header from "./components/header";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "letsvote",
    description: "letsvote app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Provider>
                <body className={inter.className}>
                    <Header />
                    {children}
                    <Footer />
                </body>
            </Provider>
        </html>
    );
}
