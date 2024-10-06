"use client";
import React, { useEffect, useState } from "react";
import Badge from "../UI/Badge";

export default function MyTradeCard({ card, province }) {
  const [detail, setDetail] = useState({});
  const { description, details, origin_field2, reg_date, status } = card;

  // useEffect(() => {
  //   setDetail({
  //     quantity:
  //       details.find((item) => item.title === "تعداد کارتن")?.value || "",
  //     yolk: details.find((item) => item.title === "نوع زرده")?.value || "",
  //     print: details.find((item) => item.title === "نوع پرینت")?.value || "",
  //     quality: details.find((item) => item.title === "کیفیت")?.value || "",
  //     pack: details.find((item) => item.title === "نوع بسته بندی")?.value || "",
  //     price: details.find((item) => item.title === "قیمت")?.value || "",
  //   });
  // }, [card]);
  useEffect(() => {
    setDetail({
      quantity:
        details.find((item) => item.title === "تعداد کارتن")?.value || "",
      yolk: details.find((item) => item.title === "نوع زرده")?.value || "",
      print: details.find((item) => item.title === "نوع پرینت")?.value || "",
      quality: details.find((item) => item.title === "کیفیت")?.value || "",
      pack: details.find((item) => item.title === "نوع بسته بندی")?.value || "",
      price: details.find((item) => item.title === "قیمت")?.value || "",
    });
  }, [card, details]);

  return (
    <div className="bg-default-50 cardShadow border border-default-200 py-3 rounded-lg mb-4">
      <div className="flex items-center justify-between px-6 pb-2">
        <p>
          <span className="text-default-500 text-xs ml-1">برند</span>
          <span className="text-default-700 text-sm">{detail.brand}</span>
        </p>
        <div
          className={` rounded-full text-default-500 text-sm font-semibold px-4 py-1 border ${status === "sold"
            ? "bg-[#FDECEB]  border-[#F7B4AE] text-[#D33C30]"
            : "text-[#178230] bg-[#E9F8EC] border-[#A6E3B5]"
            }`}
        >
          {status === "sold" ? "خرید" : "فروش"}
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="flex  gap-1 items-center">
          <span className="flex items-center">
            <span className="text-xl font-semibold text-default-900 ml-1">
              {detail.weight}
            </span>
            <span className="text-xs text-default-500">کیلو</span>
          </span>
          <span className=" bg-default-900 h-4 w-px"></span>
          <span className="flex items-center">
            <span className="text-xl font-semibold text-default-900 ml-1">
              {detail.quantity}
            </span>
            <span className="text-xs text-default-500">کارتن</span>
          </span>
          <span className=" bg-default-900 h-4 w-px"></span>
          <span className="flex items-center">
            <span className="text-xl font-semibold text-default-900 ml-1">
              {origin_field2}
            </span>
            <span className="text-xs text-default-500">{province.title}</span>
          </span>
        </div>
        <div className="flex gap-2 flex-wrap items-stretch my-4">
          {detail.pack && <Badge text={detail.pack} />}
          {detail.quality && <Badge text={detail.quality} />}
          {detail.yolk && <Badge text={detail.yolk} />}
          {detail.print && <Badge text={detail.print} />}
        </div>
        <p className="text-xs text-default-900">{description}</p>
      </div>
      <div
        className={`text-center flex items-center justify-center gap-1 pt-2 ${detail.price && detail.price !== "توافقی"
          ? "flex-row"
          : "flex-row-reverse"
          }`}
      >
        <span className="font-semibold text-2xl text-default-900">
          {detail.price && detail.price !== "توافقی" ? detail.price : "توافقی"}
        </span>
        <span className="text-default-500 text-xs">
          {detail.price && detail.price !== "توافقی" ? "تومان" : "قیمت"}
        </span>
      </div>
    </div>
  );
}
