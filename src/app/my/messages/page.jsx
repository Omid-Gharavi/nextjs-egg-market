"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MessageCard from "../../../components/Cards/MessageCard";
import Button from "@/components/UI/Button";
import FullModal from "@/components/Modal/FullModal";

const filters = [
  { id: 0, title: "همه پیام‌ها", icon: "" },
  { id: 1, title: "پیشنهاد قیمت", icon: "icon-icon-my-ads-1" },
  { id: 2, title: "تراکنش‌ها", icon: "icon-icon-price" },
  { id: 3, title: "معاملات", icon: "icon-Chart" },
  { id: 4, title: "پیام سیستم", icon: "icon-Chart" },
];
const options = [
  {
    id: 0,
    title: "پیشنهاد قیمت برای بار ۱۲.۵ چکاوک",
    description: "قیمت پیشنهادی: ۴۸,۵۰۰ تومان",
    time: "۱۴۰۳/۰۶/۱۴",
    icon: "icon-icon-my-ads-1",
    status: false,
    type: 1,
  },
  {
    id: 1,
    title: "پیشنهاد قیمت برای بار ۱۲.۵ چکاوک",
    description: "قیمت پیشنهادی: ۴۸,۵۰۰ تومان",
    time: "۱۴۰۳/۰۶/۱۴",
    icon: "icon-icon-my-ads-1",
    status: false,
    type: 2,
  },
  {
    id: 2,
    title: "پیشنهاد قیمت برای بار ۱۲.۵ چکاوک",
    description: "قیمت پیشنهادی: ۴۸,۵۰۰ تومان",
    time: "۱۴۰۳/۰۶/۱۴",
    icon: "icon-icon-my-ads-1",
    status: true,
    type: 3,
  },
  {
    id: 3,
    title: "ورود با دستگاه جدید",
    description:
      "دستگاه جدید با آی پی  ۱۴۲.۲۳.۱.۳۳  وارد حساب کاربری شما شده است. در‌صورتی‌که متعلق به شما نیست، هرچه سریع‌تر نسبت به حفظ امنیت حساب خود اقدام کنید.",
    time: "۱۴۰۳/۰۶/۱۴",
    icon: "icon-icon-my-ads-1",
    status: false,
    type: 4,
  },

  {
    id: 3,
    title: "ورود با دستگاه جدید",
    description:
      "دستگاه جدید با آی پی  ۱۴۲.۲۳.۱.۳۳  وارد حساب کاربری شما شده است. در‌صورتی‌که متعلق به شما نیست، هرچه سریع‌تر نسبت به حفظ امنیت حساب خود اقدام کنید.",
    time: "۱۴۰۳/۰۶/۱۴",
    icon: "icon-icon-my-ads-1",
    status: false,
    type: 4,
  },
  {
    id: 3,
    title: "ورود با دستگاه جدید",
    description:
      "دستگاه جدید با آی پی  ۱۴۲.۲۳.۱.۳۳  وارد حساب کاربری شما شده است. در‌صورتی‌که متعلق به شما نیست، هرچه سریع‌تر نسبت به حفظ امنیت حساب خود اقدام کنید.",
    time: "۱۴۰۳/۰۶/۱۴",
    icon: "icon-icon-my-ads-1",
    status: false,
    type: 4,
  },

  {
    id: 3,
    title: "ورود با دستگاه جدید",
    description:
      "دستگاه جدید با آی پی  ۱۴۲.۲۳.۱.۳۳  وارد حساب کاربری شما شده است. در‌صورتی‌که متعلق به شما نیست، هرچه سریع‌تر نسبت به حفظ امنیت حساب خود اقدام کنید.",
    time: "۱۴۰۳/۰۶/۱۴",
    icon: "icon-icon-my-ads-1",
    status: false,
    type: 4,
  },
  {
    id: 3,
    title: "ورود با دستگاه جدید",
    description:
      "دستگاه جدید با آی پی  ۱۴۲.۲۳.۱.۳۳  وارد حساب کاربری شما شده است. در‌صورتی‌که متعلق به شما نیست، هرچه سریع‌تر نسبت به حفظ امنیت حساب خود اقدام کنید.",
    time: "۱۴۰۳/۰۶/۱۴",
    icon: "icon-icon-my-ads-1",
    status: false,
    type: 4,
  },
  {
    id: 3,
    title: "ورود با دستگاه جدید",
    description:
      "دستگاه جدید با آی پی  ۱۴۲.۲۳.۱.۳۳  وارد حساب کاربری شما شده است. در‌صورتی‌که متعلق به شما نیست، هرچه سریع‌تر نسبت به حفظ امنیت حساب خود اقدام کنید.",
    time: "۱۴۰۳/۰۶/۱۴",
    icon: "icon-icon-my-ads-1",
    status: false,
    type: 4,
  },
  {
    id: 3,
    title: "ورود با دستگاه جدید",
    description:
      "دستگاه جدید با آی پی  ۱۴۲.۲۳.۱.۳۳  وارد حساب کاربری شما شده است. در‌صورتی‌که متعلق به شما نیست، هرچه سریع‌تر نسبت به حفظ امنیت حساب خود اقدام کنید.",
    time: "۱۴۰۳/۰۶/۱۴",
    icon: "icon-icon-my-ads-1",
    status: false,
    type: 4,
  },
  {
    id: 3,
    title: "ورود با دستگاه جدید",
    description:
      "دستگاه جدید با آی پی  ۱۴۲.۲۳.۱.۳۳  وارد حساب کاربری شما شده است. در‌صورتی‌که متعلق به شما نیست، هرچه سریع‌تر نسبت به حفظ امنیت حساب خود اقدام کنید.",
    time: "۱۴۰۳/۰۶/۱۴",
    icon: "icon-icon-my-ads-1",
    status: false,
    type: 4,
  },
  {
    id: 3,
    title: "ورود با دستگاه جدید",
    description:
      "دستگاه جدید با آی پی  ۱۴۲.۲۳.۱.۳۳  وارد حساب کاربری شما شده است. در‌صورتی‌که متعلق به شما نیست، هرچه سریع‌تر نسبت به حفظ امنیت حساب خود اقدام کنید.",
    time: "۱۴۰۳/۰۶/۱۴",
    icon: "icon-icon-my-ads-1",
    status: false,
    type: 4,
  },
];

export default function MessagePage() {
  const { back, push } = useRouter();
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState("");
  return (
    <div className="bg-white h-screen">
      <div className="sticky left-0 top-0 bg-inherit flex justify-between items-center p-6">
        <div className="flex gap-4 justify-start items-center">
          <button
            className="icon-light-bold-Right-1 text-2xl"
            onClick={() => back()}
          ></button>
          <h3 className="font-semibold text-xl text-default-900">پیام ها</h3>
        </div>
      </div>
      <div className="w-[95%] carousel gap-1 mr-4 px-1">
        {filters.map((filter, index) => (
          <button
            key={index + 1}
            className={`flex items-center gap-1 carousel-item text-default-700 text-sm p-3 py-1 rounded-3xl ${selectedFilter === filter.id
              ? "bg-purple-200"
              : "bg-white border border-default-400"
              }`}
            onClick={() => {
              setSelectedFilter(filter.id);
            }}
          >
            {filter.icon && (
              <span
                key={index + 1}
                className={`text-base text-default-700 ${filter.icon}`}
              ></span>
            )}

            <p>{filter.title}</p>
          </button>
        ))}
      </div>
      <div className="p-4">
        {!selectedFilter
          ? options.map((item, index) => (
            <MessageCard key={index + 1} data={item} setSelected={setSelectedMessage} />
          ))
          : options
            .filter((option) => option.type === selectedFilter)
            .map((item, index) => (
              <MessageCard key={index + 1} data={item} setSelected={setSelectedMessage} />
            ))}
      </div>
      <FullModal id="messageModal">
        <div className="w-full bg-inherit flex justify-between items-center pt-8 pb-6 px-6">
          <form
            method="dialog"
            className="flex gap-4 justify-start items-center"
          >
            <button className="icon-light-bold-Right-1 text-2xl"></button>
            <h3 className="font-semibold text-xl text-default-900">
              {`پیام ها / ${filters.find((item) => item.id === selectedMessage.type)?.title
                }`}
            </h3>
          </form>
        </div>
        <div className="px-6">
          {selectedMessage.type === 1 ? (
            <>
              {selectedMessage.description}
              <Button
                text={"رفتن به صفحه پیشنهادات قیمت"}
                type={
                  "w-full text-tertiary border-solid border-[2px] border-tertiary"
                }
                onClick={() => push("/my/priceSuggestion")}
              />
            </>
          ) : selectedMessage.type === 2 ? (
            <TransactionMessage data={selectedMessage} push={push} />
          ) : selectedMessage.type === 3 ? (
            <TradeMessage data={selectedMessage} />
          ) : selectedMessage.type === 4 ? (
            <SystemMessage data={selectedMessage.description} push={push} />
          ) : (
            ""
          )}
        </div>
      </FullModal>
    </div>
  );
}

function SystemMessage({ data, push }) {
  return (
    <div>
      <p className="mb-10 text-default-900">{data}</p>
      <Button
        text={"مشاهده دستگاه‌های فعال"}
        type={"w-full text-tertiary border-solid border-[2px] border-tertiary"}
        onClick={() => push("/my")}
      />
    </div>
  );
}

function TradeMessage({ data }) {
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
      text: "آذربایجان غربی",
      second: `(${"آذربایجان غربی"})`,
    },
    {
      name: "وزن بار",
      text: 12.5,
      second: "کیلوگرم",
    },
    {
      name: "تعداد کارتن",
      text: 360,
      second: "کارتن",
    },
    {
      name: "فی بار",
      text: 49.5,
      second: "تومان",
    },
  ];
  return (
    <>
      <p className="text-default-900 mb-6">{data.description}</p>
      <div className="border border-[#D3D3D3] bg-[#F7F7F7] rounded-xl">
        <ul className="flex flex-col gap-2 mt-2">
          {lists.map((list, index) => (
            <li
              key={index + 1}
              className="flex justify-between items-center px-4 h-11"
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
        <div className="mt-1 mx-10 h-[109px] bg-tertiary rounded-xl flex flex-col items-center justify-center gap-2 pb-2 pt-4">
          <p className="text-sm font-normal text-default-300">
            مبلغ علی‌الحساب
          </p>
          <div className="flex items-center gap-2">
            <p className="text-[32px] text-default-50 font-semibold">
              {Number(lists.find((item) => item.name === "وزن بار").value) *
                Number(
                  lists.find((item) => item.name === "تعداد کارتن").value
                ) *
                Number(lists.find((item) => item.name === "فی بار").value)}
            </p>
            <p className="text-default-400 text-sm font-normal">تومان</p>
          </div>
        </div>
        <ul className="flex flex-col gap-2 mt-5 pb-4 text-default-500 font-normal text-xs px-4">
          <li className="flex items-center gap-2">
            <span className="text-[6px] icon-light-bold-Record-input"></span>
            بعد از بارگیری و اعلام وزن باسکول، مبلغ دقیق تعیین می‌گردد.
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[6px] icon-light-bold-Record-input"></span>
            کم و زیاد شدن ۱۰۰ گرمی وزن بار، طبق عرف بازار پذیرفته شده است.
          </li>
        </ul>
      </div>
    </>
  );
}

function TransactionMessage({ data, push }) {
  return (
    <div>
      <p className="mb-14 text-default-900">{data.description}</p>
      <div className="py-2 w-full rounded-xl bg-gradient-to-r from-tertiary to-purple-900 flex flex-col items-center mb-8">
        <div className="icon-light-outline-Wallet text-default-300 text-3xl mb-2"></div>
        <p className="text-sm mb-4 text-default-300">موجودی کیف پول:</p>
        <p>
          <span className="font-semibold text-3xl ml-2 text-default-50">
            450.000.000
          </span>
          <span className="text-xs text-[#C2C2C2]">تومان</span>
        </p>
      </div>
      <Button
        text={"رفتن به کیف پول"}
        type={"w-full text-tertiary border-solid border-[2px] border-tertiary"}
        onClick={() => push("/my/wallet")}
      />
    </div>
  );
}