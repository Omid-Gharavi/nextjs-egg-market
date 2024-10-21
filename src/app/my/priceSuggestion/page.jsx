"use client";
import PriceSuggestionHeader from "@/components/Cards/PriceSuggestionHeader";
import { trimPrice } from "@/utils/trimPrice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import priceSuggestion from "../../../components/svg/priceSuggestion";

export default function Page() {
  const { back } = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  return (
    <>
      <div className="sticky top-0 px-4 bg-surface-secondary py-6 gap-4 flex justify-start items-center z-10">
        <button
          className="icon-light-bold-Right-1 text-2xl"
          onClick={() => back()}
        ></button>
        <h3 className="font-semibold text-xl text-default-900">پیشنهاد قیمت</h3>
      </div>
      <div className="flex flex-col h-full">
        <div role="tablist" className="tabs tabs-lifted flex px-4">
          <a
            role="tab"
            className={`flex-1 tab text-default-500 [--tab-border-color:#F5F5F5] [--tab-border:0px] text-sm ${activeTab === 1
                ? "tab-active [--tab-bg:var(--default-50)] text-success font-medium"
                : ""
              }`}
            onClick={() => setActiveTab(1)}
          >
            پیشنهادهای دریافتی
          </a>
          <a
            role="tab"
            className={`flex-1 tab text-default-500 [--tab-border-color:#F5F5F5] [--tab-border:0px] text-sm ${activeTab === 2
                ? "tab-active [--tab-bg:var(--default-50)] text-[#3772CC] font-medium"
                : ""
              }`}
            onClick={() => setActiveTab(2)}
          >
            پیشنهادهای ارسالی
          </a>
        </div>
        <div className="flex-1 rounded-b-xl px-4">
          <div
            className={`h-3 w-full bg-default-50 ${activeTab === 1 ? "rounded-tl-xl" : "rounded-tr-xl"
              }`}
          ></div>
          {activeTab === 1 ? (
            <div className="space-y-6">
              <div className="bg-default-50 rounded-xl">
                <PriceSuggestionHeader />
                <div className="mt-6 space-y-6">
                  <div className="px-6 pb-6 last:border-none line">
                    <p className="font-semibold text-xs text-default-700">
                      پیشنهاد 1 - مقصد: قم (قم)
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <p className="text-default-700 text-xs">
                        قیمت:{" "}
                        <span className="text-xl text-default-900 font-semibold">
                          {trimPrice("48500")}
                        </span>{" "}
                        <span className="text-default-500">تومان</span>
                      </p>
                      <div className="py-1 px-2 flex gap-3 flex-1">
                        <button className="flex-1 h-11 flex justify-center items-center gap-1 border border-success rounded-xl">
                          <span className="icon-light-linear-Tick text-2xl text-success"></span>
                          <p className="font-bold text-success">انتخاب</p>
                        </button>
                        <button className="flex-1 h-11 flex justify-center items-center gap-1 border border-danger-900 rounded-xl">
                          <span className="icon-light-linear-Tick text-2xl text-danger-900"></span>
                          <p className="font-bold text-danger-900">رد کردن</p>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-6 ">
                    <p className="font-semibold text-xs text-default-700">
                      پیشنهاد 1 - مقصد: قم (قم)
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <p className="text-default-700 text-xs">
                        قیمت:{" "}
                        <span className="text-xl text-default-900 font-semibold">
                          {trimPrice("48500")}
                        </span>{" "}
                        <span className="text-default-500">تومان</span>
                      </p>
                      <div className="py-1 px-2 flex gap-3 flex-1">
                        <button className="flex-1 h-11 flex justify-center items-center gap-1 border border-success rounded-xl">
                          <span className="icon-light-linear-Tick text-lg text-success"></span>
                          <p className="font-bold text-success">انتخاب</p>
                        </button>
                        <button className="flex-1 h-11 flex justify-center items-center gap-1 border border-danger-900 rounded-xl">
                          <span className="icon-light-linear-Tick text-lg text-danger-900"></span>
                          <p className="font-bold text-danger-900">رد کردن</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-default-50 rounded-xl">
                <PriceSuggestionHeader />
                <div className="mt-6 space-y-6">
                  <div className="px-6 pb-6 last:border-none line">
                    <p className="font-semibold text-xs text-default-700">
                      پیشنهاد 1 - مقصد: قم (قم)
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <p className="text-default-700 text-xs">
                        قیمت:{" "}
                        <span className="text-xl text-default-900 font-semibold">
                          {trimPrice("48500")}
                        </span>{" "}
                        <span className="text-default-500">تومان</span>
                      </p>
                      <div className="py-1 px-2 flex gap-3 flex-1">
                        <button className="flex-1 h-11 flex justify-center items-center gap-1 border border-success rounded-xl">
                          <span className="icon-light-linear-Tick text-2xl text-success"></span>
                          <p className="font-bold text-success">انتخاب</p>
                        </button>
                        <button className="flex-1 h-11 flex justify-center items-center gap-1 border border-danger-900 rounded-xl">
                          <span className="icon-light-linear-Tick text-2xl text-danger-900"></span>
                          <p className="font-bold text-danger-900">رد کردن</p>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-6 ">
                    <p className="font-semibold text-xs text-default-700">
                      پیشنهاد 1 - مقصد: قم (قم)
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <p className="text-default-700 text-xs">
                        قیمت:{" "}
                        <span className="text-xl text-default-900 font-semibold">
                          {trimPrice("48500")}
                        </span>{" "}
                        <span className="text-default-500">تومان</span>
                      </p>
                      <div className="py-1 px-2 flex gap-3 flex-1">
                        <button className="flex-1 h-11 flex justify-center items-center gap-1 border border-success rounded-xl">
                          <span className="icon-light-linear-Tick text-lg text-success"></span>
                          <p className="font-bold text-success">انتخاب</p>
                        </button>
                        <button className="flex-1 h-11 flex justify-center items-center gap-1 border border-danger-900 rounded-xl">
                          <span className="icon-light-linear-Tick text-lg text-danger-900"></span>
                          <p className="font-bold text-danger-900">رد کردن</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-default-50 rounded-xl">
                <PriceSuggestionHeader />
                <div className="mt-6 space-y-6">
                  <div className="px-6 pb-6 ">
                    <div className="mt-4 flex items-center gap-2">
                      <p className="text-default-700 text-xs">
                        قیمت:{" "}
                        <span className="text-xl text-default-900 font-semibold">
                          {trimPrice("48500")}
                        </span>{" "}
                        <span className="text-default-500">تومان</span>
                      </p>
                      <div className="py-1 px-2 flex gap-3 flex-1">
                        <button className="flex-1 h-11 flex justify-center items-center gap-1 border border-[#3E81E6] rounded-xl">
                          <span className="icon-icon---Terms-of-use-3 text-lg text-[#3E81E6]"></span>
                          <p className="font-bold text-[#3E81E6]">ویرایش</p>
                        </button>
                        <button className="flex-1 h-11 flex justify-center items-center gap-1 border border-danger-900 rounded-xl">
                          <span className="icon-light-linear-Close text-lg text-danger-900"></span>
                          <p className="font-bold text-danger-900">حذف</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
