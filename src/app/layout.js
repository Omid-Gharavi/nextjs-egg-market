import { Inter } from "next/font/google";
import "./globals.css";
import './style.css'
import Header from "@/components/header/Header"
import Path from "@/components/Path";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Egg Market",
  description: "Egg Market Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${inter.className} font-[vazir]`}>
        <Path excludePath={['/about', '/calculator', '/auth/register', '/auth/code', '/auth/password', '/auth/signup']} childProp={<Header />}></Path>
        {children}
        <Path excludePath={['/about', '/calculator', '/auth/register', '/auth/code', '/auth/password', '/auth/signup']} childProp={<Footer />}></Path>
      </body>
    </html>
  );
}
