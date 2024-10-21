"use client";
import React, { useEffect, useState } from "react";
import Badge from "../UI/Badge";
import BottomModal from "../Modal/BottomModal";
import Button from "../UI/Button";

const billData = [
  { title: "کد رهگیری", value: "۱۴۰۳۰۹۹۰۹۱۳۰۴۰۷۳۷۳۵۴۹۱۰۰۰۹۴۰۷" },
  { title: "شماره بارنامه", value: "۱۴۰۳/۱۱ | ۹۹۰۹۱۳" },
  { title: "شماره ماشین", value: "۱۶ | ۱۵۳ ع ۳۴" },
  { title: "شماره تماس راننده", value: "۰۹۱۲ ۳۴۵ ۶۷۸۹" },
  { title: "شماره فاکتور", value: "۱۴۰۳۰۷۱۴۰۰۴-۲" },
  { title: "مقصد", value: "تهران" },
  { title: "فی بار", value: "۴۹,۵۰۰" },
  { title: "مبلغ کل", value: "۲۵۷,۵۰۰,۰۰۰" },
];

export default function MyTradeCard({ card, province, typeOfTrade }) {
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
    <div className="bg-default-50 tradeCardShadow border border-default-200 py-3 rounded-lg mb-4">
      <div className="flex items-center justify-between px-4 pb-2">
        <p>
          <span className="text-default-500 text-xs ml-1">برند</span>
          <span className="text-default-700 text-sm">{detail.brand}</span>
          <span
            className={`text-sm font-semibold ${status === "sold" ? "text-[#178230]" : " text-[#D33C30]"
              }`}
          >
            {status === "sold" ? "(خرید)" : "(فروش)"}
          </span>
        </p>

        <div>
          {typeOfTrade === "done" ? (
            <button
              className="flex gap-1 items-center border border-tertiary rounded-3xl font-semibold text-sm py-1 px-3"
              onClick={() =>
                document.getElementById("tradeBillModal").showModal()
              }
            >
              <span className="icon-light-linear-Document-Justify-Right-1 text-base text-tertiary"></span>
              <span>فاکتور</span>
            </button>
          ) : (
            <p className="text-primary text-xs font-bold">
              (فاکتور علی الحساب)
            </p>
          )}
        </div>
      </div>
      <div className="px-4 py-4">
        <div className="flex gap-1 items-center">
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
            <span className="text-xs text-default-500">{province?.title}</span>
          </span>
        </div>
        <div className="flex gap-2 flex-wrap items-stretch my-4">
          {detail.pack && <Badge text={detail.pack} />}
          {detail.quality && <Badge text={detail.quality} />}
          {detail.yolk && <Badge text={detail.yolk} />}
          {detail.print && <Badge text={detail.print} />}
        </div>
        <p className="text-xs text-default-900 limitText">{description}</p>
      </div>
      <div className="px-4">
        {typeOfTrade === "done" ? (
          <div className="stext-center flex items-center justify-center gap-1 pt-2 flex-row">
            <span className="font-semibold text-2xl text-default-900">
              {detail.price && detail.price}
            </span>
            <span className="text-default-500 text-xs">تومان</span>
          </div>
        ) : (
          <button className="bg-green-100 rounded-xl w-full h-12 text-default-50 font-bold">
            مشاهده فاکتور و پرداخت
          </button>
        )}
      </div>
      <BottomModal id="tradeBillModal">
        <form
          method="dialog"
          className="flex-0 flex justify-between items-center py-4 px-6 border-b border-default-300 bg-default-50"
        >
          <h3 className="text-sm text-tertiary">فاکتور نهایی</h3>
          <button className="btn btn-sm btn-circle btn-ghost">
            <span className="icon-light-bold-Close text-2xl text-[#2D264B]"></span>
          </button>
        </form>
        <div className="flex flex-col gap-5 px-6 py-2">
          <div className="flex gap-1 items-center">
            <span className="text-xl font-semibold text-default-900 ml-1">
              چکاوک
            </span>
            <span className=" bg-default-900 h-4 w-px"></span>
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
              <span className="text-xs text-default-500">
                {province?.title}
              </span>
            </span>
          </div>
          {billData.map((item) => (
            <div className="flex justify-between items-center" key={index + 1}>
              <p className="text-sm text-default-500">{item.title}</p>
              <p className="text-base font-semibold text-default-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>
        <form method="dialog" className="flex gap-4 px-6 py-4">
          <Button type="button-primary" text="ذخیره" width="w-3/5" />
          <Button type="button-ghost" text="لغو" width="w-2/5" />
        </form>
      </BottomModal>
    </div>
  );
}
