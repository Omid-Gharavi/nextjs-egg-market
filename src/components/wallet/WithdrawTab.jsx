import React, { useEffect, useRef, useState } from "react";
import Button from "../UI/Button";
import Num2persian from "num2persian";
import { adjustWidthOfInput } from "@/utils/adjustWidthOfInput";

const options = [
  "IR۱۲۳۴۵۶۷۸۹۱۲۳۴۵۶۷۸۹۱۲۳۴۵۶",
  "IR۱۲۳۴۵۶۷۸۹۱۲۳۴۵۶۷۸۹۱۲۳۴۵",
  "IR۱۲۳۴۵۶۷۸۹۱۲۳۴۵۶۷۸۹۱۲۳۴",
];

export default function WithdrawTab() {
  const [withdrawValues, setWithdrawValues] = useState({
    value: "",
    accountNumber: "",
  });
  const [showMenu, setShowMenu] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  });

  return (
    <>
      <div className="p-8 mb-10">
        <div className="mb-8">
          <p className="text-default-700 text-sm mb-4">
            مبلغ مورد نظر برای نقد کردن موجودی را وارد کنید
          </p>
          <div className="flex gap-1 items-center relative mb-2 w-full rounded-xl border border-[#C2C2C2] bg-default-50 focus:bg-white focus:border-tertiary py-3 px-6">
            <input
              className={`placeholder:text-default-400 text-[#D33C30] text-lg font-black placeholder:font-normal flex-none ${
                withdrawValues.value ? `` : "text-center w-full"
              }`}
              value={withdrawValues.value}
              onChange={(e) => {
                setWithdrawValues({ ...withdrawValues, value: e.target.value });
                e.target.value !== ""
                  ? adjustWidthOfInput(
                      document.getElementById("walletWithdrawInput")
                    )
                  : document
                      .getElementById("walletWithdrawInput")
                      .style.removeProperty("width");
              }}
              id="walletWithdrawInput"
              placeholder="مبلغ (تومان)"
              type="number"
            />
            <span
              className={`${
                withdrawValues.value
                  ? "flex-1 text-xs text-default-500 font-medium "
                  : "hidden"
              }`}
            >
              تومان
            </span>
          </div>
          <p className="text-sm text-default-400">
            {withdrawValues.value.length >= 4 &&
              `${Num2persian(withdrawValues.value * 10)} ریال`}
          </p>
        </div>
        <div>
          <p className="text-default-700 text-sm mb-4">شماره شبای واریزی</p>
          <div
            className={`custom--dropdown-container bg-default-50 border-[#C2C2C2] withdrawTab ${
              showMenu && "border-tertiary"
            }`}
          >
            <div
              ref={inputRef}
              onClick={() => setShowMenu(!showMenu)}
              className="dropdown-input justify-end"
            >
              <div className={`dropdown-selected-value `}>
                {withdrawValues.accountNumber}
              </div>
              <span className="icon-Open-List text-default-700 text-base"></span>
            </div>
            {showMenu && (
              <div className="dropdown-menu alignment--auto">
                {options.map((option, index) => (
                  <option
                    key={index}
                    onClick={() => {
                      setWithdrawValues({
                        ...withdrawValues,
                        accountNumber: option,
                      });
                    }}
                    className="dropdown-item"
                  >
                    {option}
                  </option>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <form
        method="dialog"
        className="flex-0 bg-white border-t-default-300 modalShadow px-6 py-4 w-full"
      >
        <Button
          type="button-primary"
          text="ثبت درخواست وجه"
          onClick={() => {}}
          width="w-full"
          disabled={
            !withdrawValues.value ||
            !withdrawValues.accountNumber ||
            withdrawValues.value === "0"
          }
        />
      </form>
    </>
  );
}
