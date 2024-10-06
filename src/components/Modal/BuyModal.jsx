"use client";

import React from "react";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";

const BuyModal = ({ load, setSelected }) => {
  const router = useRouter();

  const weight =
    load.details?.find((item) => item.title === "وزن کارتن")?.value || "";
  const quantity =
    load.details?.find((item) => item.title === "تعداد کارتن")?.value || "";
  const price =
    load.details?.find((item) => item.title === "قیمت")?.value || "";
  const lists = [
    {
      name: "برند",
      text: "چکاوک",
    },
    {
      name: "محل بارگیری",
      text: "کاشان",
      second: "(اصفهان)",
    },
    {
      name: "مقصد",
      text: load.origin_field2,
      second: `(${load.origin_field2})`,
    },
    {
      name: "وزن بار",
      text: weight,
      second: "کیلوگرم",
    },
    {
      name: "تعداد کارتن",
      text: quantity,
      second: "کارتن",
    },
    {
      name: "فی بار",
      text: price,
      second: "تومان",
    },
  ];

  return (
    <div className="overflow-y-scroll">
      <div className="mt-2">
        <ul className="flex flex-col gap-2">
          {lists.map((list, index) => (
            <li
              key={index + 1}
              className="flex justify-between items-center px-6 h-11"
            >
              <p className="text-sm font-normal text-default-500">
                {list.name}
              </p>
              <div className="flex items-center gap-1">
                <p className="font-semibold text-default-900">{list.text}</p>
                <p className="text-sm font-normal text-default-500">
                  {list.second}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-1  mx-10 h-[109px] bg-tertiary rounded-xl flex flex-col items-center justify-center gap-2 pb-2 pt-4">
        <p className="text-sm font-normal text-default-300">مبلغ علی‌الحساب</p>
        <div className="flex items-center gap-2">
          <p className="text-[32px] text-default-50 font-semibold">
            {Number(price) * Number(quantity) * Number(weight)}
          </p>
          <p className="text-default-400 text-sm font-normal">تومان</p>
        </div>
      </div>
      <ul className="flex flex-col gap-2 mt-5 text-default-500 font-normal text-xs px-4">
        <li className="flex items-center gap-2">
          <span className="text-[6px] icon-light-bold-Record-input"></span>
          بعد از بارگیری و اعلام وزن باسکول، مبلغ دقیق تعیین می‌گردد.
        </li>
        <li className="flex items-center gap-2">
          <span className="text-[6px] icon-light-bold-Record-input"></span>
          کم و زیاد شدن ۱۰۰ گرمی وزن بار، طبق عرف بازار پذیرفته شده است.
        </li>
      </ul>
      <div className="flex flex-col items-center justify-center gap-4 mt-5 px-6 pb-4">
        <Button text={"پرداخت آنلاین"} type={"bg-primary w-full"} />
        <Button
          text={"پرداخت از کیف پول"}
          type={
            "w-full text-tertiary border-solid border-[2px] border-tertiary"
          }
          onClick={() => router.push("/buy")}
        />
        <form method="dialog" className="w-full">
          <Button
            text={"لغو"}
            type={"w-full text-tertiary"}
            onClick={() => {
              setSelected("");
              document.getElementById("modal_buy").close();
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default BuyModal;
