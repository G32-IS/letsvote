import "./global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/header";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Letsvote",
    description: "Letsvote app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
