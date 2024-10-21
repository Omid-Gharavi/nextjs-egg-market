import { Inter } from "next/font/google";
import "./globals.css";
import "../../public/assets/fonts/icomoon/style.css";
import Header from "@/components/header/Header";
import Path from "@/components/Path";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Egg Market",
  description: "Egg Market Shop",
};

export default function RootLayout({ children }) {
  return (
    <html
      className="max-w-[440px] mx-auto border-solid border-l-[1px] border-r-[1px] border-default-400 bg-[#F5F5F5]"
      lang="fa"
      dir="rtl"
    >
      <body
        className={`${inter.className} relative font-[vazir] overflow-x-hidden`}
      >
        <Path
          excludePath={[
            "/about",
            // "/calculator",
            "/auth/register",
            "/auth/code",
            "/auth/password",
            "/auth/signup",
            "/my",
            "/my/ads",
            "/my/trades",
            "/my/transactions",
            "/my/wallet/transactions",
            "/my/wallet",
            "/buy",
            "/price",
            "/my/security",
            "/my/security/set-password",
            "/my/security/change-password",
            "/calculator",
            "/my/priceSuggestion",
            "/my/messages",
            "/my/messages/",
            '/my/profile',
          ]}
          childProp={<Header />}
        ></Path>
        {children}
        <Path
          excludePath={[
            "/about",
            // '/calculator',
            "/auth/register",
            "/auth/code",
            "/auth/password",
            "/auth/signup",
            "/buy",
            "/my/ads",
            "/my/trades",
            "/my/transactions",
            "/my/wallet",
            "/my/wallet/transactions",
            "/my/security",
            "/my/security/set-password",
            "/my/security/change-password",
            "/my/priceSuggestion",
            "/my/messages",
            "/my/messages/",
            '/my/profile',
          ]}
          childProp={<Footer />}
        ></Path>
      </body>
    </html>
  );
}
