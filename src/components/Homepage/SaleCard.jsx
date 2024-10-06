"use client";
import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import Badge from "../UI/Badge";

export default function SaleCard({ load, province, setSelected }) {
  const [detail, setDetail] = useState({});

  const { description, details, origin_field2, reg_date, status } = load;
  const d = new Date(reg_date);

  useEffect(() => {
    setDetail({
      quantity:
        details.find((item) => item.title === "تعداد کارتن")?.value || "",
      yolk: details.find((item) => item.title === "نوع زرده")?.value || "",
      print: details.find((item) => item.title === "نوع پرینت")?.value || "",
      quality: details.find((item) => item.title === "کیفیت")?.value || "",
      pack: details.find((item) => item.title === "نوع بسته بندی")?.value || "",
      price: details.find((item) => item.title === "قیمت")?.value || "",
      weight: details.find((item) => item.title === "وزن کارتن")?.value || "",
    });
  }, [load]);

  return (
    <div
      className={`${status === "sold" ? "bg-purple-100" : "bg-default-50"
        } cardShadow border border-default-200 py-4 rounded-md mb-4`}
    >
      <div className="flex items-center justify-between px-4 pb-2">
        <div className="flex gap-3 items-center">
          <span className="icon-Share text-base text-tertiary"></span>
          <p>
            <span className="text-default-500 text-xs ml-1">برند</span>
            {/* <span className="text-tertiary text-sm">{detail.brand}</span> */}
          </p>
        </div>
        <p className="text-default-500 text-xs">
          {new Intl.DateTimeFormat("fa-IR").format(d)}
        </p>
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
            <span className="text-xs text-default-500">{province?.title}</span>
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
        className={`text-center flex items-center justify-center gap-1 border-t border-t-default-200 pt-2 ${detail.price && detail.price !== "توافقی"
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
      <div
        className={`flex items-center px-5 gap-3 mt-3 ${status === "sold" ? "justify-center" : ""
          }`}
      >
        {status === "sold" ? (
          <div className="font-bold text-sm text-default-50 leading-5 rounded-[4px] bg-green-100 px-2">
            فروخته شد
          </div>
        ) : (
          <>
            <Button
              type="button-primary"
              text="خرید"
              width="flex-1"
              disabled={
                detail.price && detail.price !== "توافقی" ? false : true
              }
              onClick={() => {
                document.getElementById("modal_buy").showModal();
                setSelected(load.loadID);
              }}
            />
            <Button
              type="button-primary-ghost"
              text="پیشنهاد قیمت"
              width="flex-1"
              onClick={() => { }}
            />
          </>
        )}
      </div>
    </div>
  );
}
