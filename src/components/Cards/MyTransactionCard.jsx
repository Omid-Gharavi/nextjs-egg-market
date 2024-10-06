import React from "react";

export default function MyTransactionCard({ type, source }) {
  return (
    <div className="bg-[#F5F5F5] rounded-xl px-4 py-2 mb-2">
      <div className="mb-2 flex justify-between items-center">
        <span className="text-sm text-default-700">
          {`${
            source === "wallet"
              ? type === "deposit"
                ? "واریز به کیف پول"
                : "برداشت از کیف پول"
              : "فروش بار ۱۲.۵ چکاوک کاشان"
          }`}
        </span>
        <span className="text-10px text-default-500">۱۴۰۳/۰۵/۲۸ - ۱۰:۳۲</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-10px text-default-500">
          {source === "wallet" ? "" : "واریز به حساب | "}
          ش. پیگیری ۰۳۲۱۲۳۱۰۴
        </span>
        <p
          className={`font-medium ${
            type === "deposit" ? "text-[#178230]" : "text-[#D33C30]"
          } `}
        >
          <span className="ml-1">
            ۲۳۰.۰۰۰.۰۰۰{`${type === "deposit" ? "+" : "-"}`}
          </span>{" "}
          تومان
        </p>
      </div>
    </div>
  );
}
