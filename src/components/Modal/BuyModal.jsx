"use client";

import React from "react";
import Button from "../UI/Button";
import { useRouter } from "next/navigation";
import { useProductDetail } from "@/store/productDetail";

const BuyModal = ({ load, setSelected }) => {
  const router = useRouter();
  const product = useProductDetail(state => state.product)

  const weight =
    load.details?.find((item) => item.title === "وزن کارتن")?.value || "";
  const quantity =
    load.details?.find((item) => item.title === "تعداد کارتن")?.value || "";
  const price =
    load.details?.find((item) => item.title === "قیمت")?.value || "";
  const lists = [
    {
      name: "کد رهگیری",
      text: "--",
    },
    {
      name: "شماره بارنامه",
      text: "--",
    },
    {
      name: "شماره ماشین",
      text: '--',
    },
    {
      name: "شماره تماس راننده",
      text: '--',
    },
    {
      name: "شماره فاکتور",
      text: '۱۴۰۳۰۷۱۴۰۰۴-۱',
    },
    {
      name: "مقصد",
      text: 'تهران',
      second: "(تهران)",
    },
    {
      name: "فی بار",
      text: '۴۹,۵۰۰',
      second: "تومان",
    },
    {
      name: "مبلغ کل",
      text: '۲۵۷,۵۰۰,۰۰۰',
      second: "تومان",
    },
  ];

  return (
    <div className="overflow-y-scroll">
      <div className="mt-2">
        <ul className="flex flex-col gap-2">
          <div className="px-6 py-[6px]">
            {
              <p className="font-medium">{`${product.city} | ${product.weight}`}<span className="text-xs text-default-500"> کیلو</span> | {product.quantity}<span className="text-xs text-default-500"> کارتن</span> | {product.city} <span className="text-xs text-default-500">({product.city})</span></p>
            }
          </div>
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
      <div className="grid grid-cols-2 items-center justify-center gap-4 mt-5 px-6 pb-4">
        <Button text={"پرداخت آنلاین"} type={"bg-success text-default-50 font-normal"} />
        <Button
          text={"پرداخت از کیف پول"}
          type={
            "text-success border-solid border-[2px] border-success"
          }
          onClick={() => router.push("/buy")}
        />
        <form method="dialog" className="w-full col-span-2">
          <Button
            text={"لغو"}
            type={"w-full text-danger-900"}
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
