import React, { useEffect } from "react";
import { useState } from "react";
import Button from "../UI/Button";
import Num2persian from "num2persian";
import { adjustWidthOfInput } from "@/utils/adjustWidthOfInput";

export default function DepositTabs() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [depositValue, setDepositValue] = useState("");
  const [billRegister, setBillRegister] = useState({
    depositValue: "",
    billNumber: "",
    date: "",
    imageUrl: "",
  });

  return (
    <>
      <div className="pt-4 mb-16 bg-surface-secondary">
        <div role="tablist" className="tabs flex tabs-lifted *:text-base">
          <a
            role="tab"
            className={`tab flex-1 text-default-500 [--tab-border-color:#F5F5F5] ${
              selectedTab === 1
                ? "tab-active [--tab-bg:var(--default-50)] text-tertiary font-medium"
                : ""
            }`}
            onClick={() => setSelectedTab(1)}
          >
            واریز آنی
          </a>
          <a
            role="tab"
            className={`tab flex-1 text-default-500 [--tab-border-color:#F5F5F5] ${
              selectedTab === 2
                ? "tab-active [--tab-bg:var(--default-50)] text-tertiary font-medium"
                : ""
            }`}
            onClick={() => setSelectedTab(2)}
          >
            ثبت فیش واریزی
          </a>
        </div>
        <div
          className={`py-6 px-4 bg-default-50 rounded-b-xl h-full ${
            selectedTab === 1 ? "rounded-tl-xl" : "rounded-tr-xl"
          }`}
        >
          {selectedTab === 1 ? (
            <div className="px-8 pt-10">
              <p className="text-default-700 text-sm mb-4">
                مبلغ مورد نظر برای افزایش موجودی را وارد کنید
              </p>
              <div className="flex gap-1 items-center relative mb-2 w-full rounded-xl border border-[#C2C2C2] bg-default-50 focus:bg-white focus:border-tertiary py-3 px-6">
                <input
                  className={`placeholder:text-default-400 bg-inherit text-[#178230] font-black placeholder:font-normal flex-none ${
                    depositValue ? `` : "w-full"
                  }`}
                  value={depositValue}
                  onChange={(e) => {
                    setDepositValue(e.target.value);
                    e.target.value !== ""
                      ? adjustWidthOfInput(
                          document.getElementById("walletDepositInput")
                        )
                      : document
                          .getElementById("walletDepositInput")
                          .style.removeProperty("width");
                  }}
                  id="walletDepositInput"
                  placeholder="مبلغ (تومان)"
                  type="number"
                />
                <span
                  className={`${
                    depositValue
                      ? "flex-1 text-xs text-default-500 font-medium "
                      : "hidden"
                  }`}
                >
                  تومان
                </span>
              </div>
              <p className="text-sm text-default-400">
                {depositValue.length >= 4 &&
                  `${Num2persian(depositValue * 10)} ریال`}
              </p>
            </div>
          ) : (
            <>
              <div className="flex gap-1 items-center relative w-full rounded-xl border border-[#C2C2C2] bg-default-50 focus:bg-white focus:border-tertiary py-3 px-6">
                <input
                  className={`placeholder:text-default-400 text-[#178230] font-black placeholder:font-normal flex-none ${
                    billRegister.depositValue ? `` : "w-full"
                  }`}
                  value={billRegister.depositValue}
                  onChange={(e) => {
                    setBillRegister({
                      ...billRegister,
                      depositValue: e.target.value,
                    });
                    e.target.value !== ""
                      ? adjustWidthOfInput(
                          document.getElementById("walletDepositBillInput")
                        )
                      : document
                          .getElementById("walletDepositBillInput")
                          .style.removeProperty("width");
                  }}
                  id="walletDepositBillInput"
                  placeholder="مبلغ (تومان)"
                  type="number"
                />
                <span
                  className={`${
                    billRegister.depositValue
                      ? "flex-1 text-xs text-default-500 font-medium "
                      : "hidden"
                  }`}
                >
                  تومان
                </span>
              </div>
              <p className="text-sm text-default-400 mt-2 mb-4">
                {billRegister.depositValue.length >= 4 &&
                  `${Num2persian(billRegister.depositValue * 10)} ریال`}
              </p>
              <div className="flex relative w-full my-4 gap-1 rounded-xl border border-[#C2C2C2] bg-default-50 py-3 px-6">
                <input
                  type="text"
                  id="billInput"
                  className={`flex-1 text-default-900 font-black outline-none bg-inherit  placeholder:text-default-400 placeholder:font-normal`}
                  value={billRegister.billNumber}
                  onChange={(e) =>
                    setBillRegister({
                      ...billRegister,
                      billNumber: e.target.value,
                    })
                  }
                  placeholder=" شماره فیش"
                />
              </div>
              <div className="flex relative w-full mb-4 gap-1 rounded-xl border border-[#C2C2C2] bg-default-50 py-3 px-6">
                <input
                  type="text"
                  id="billInput"
                  className="flex-1 text-default-900 font-black outline-none bg-inherit  placeholder:text-default-400 placeholder:font-normal"
                  value={billRegister.date}
                  onChange={(e) =>
                    setBillRegister({
                      ...billRegister,
                      date: e.target.value,
                    })
                  }
                  placeholder="تاریخ"
                />
              </div>
              <div className="flex justify-between relative w-full mb-2 gap-1 rounded-xl border border-[#C2C2C2] bg-default-50">
                <span className="text-default-400 py-3 px-6">
                  {billRegister.imageUrl
                    ? billRegister.imageUrl
                    : " بارگذاری تصویر فیش واریزی"}
                </span>
                <button className="text-default-50 font-medium bg-tertiary rounded-l-xl px-4">
                  انتخاب تصویر
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <form
        method="dialog"
        className="flex-0 bg-white border-t-default-300 modalShadow px-6 py-4 w-full"
      >
        {selectedTab === 1 ? (
          <Button
            type="button-primary"
            text="افزایش موجودی"
            onClick={() => {}}
            width="w-full"
            disabled={!depositValue || depositValue === "0"}
          />
        ) : (
          <Button
            type="button-primary"
            text="ثبت"
            onClick={() => {}}
            width="w-full"
            disabled={
              !billRegister.depositValue ||
              !billRegister.billNumber ||
              !billRegister.date ||
              !billRegister.imageUrl ||
              billRegister.depositValue === "0"
            }
          />
        )}
      </form>
    </>
  );
}
