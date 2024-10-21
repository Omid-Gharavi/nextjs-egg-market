"use client";
import Loading from "@/app/loading";
import MyTradeCard from "@/components/Cards/MyTradeCard";
import HistoryModal from "@/components/Modal/HistoryModal";
import { monthNames } from "@/components/static";
import Checkbox from "@/components/UI/Checkbox";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const items = [
  {
    id: 0,
    title: "خرید",
  },
  {
    id: 1,
    title: "فروش",
  },
];

export default function Page() {
  const { back } = useRouter();
  const [data, setData] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [selected, setSelected] = useState({
    0: false,
    1: false,
  });
  const [activeTab, setActiveTab] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  const listenToScroll = () => {
    let heightToHideFrom = 70;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (winScroll > heightToHideFrom) {
      isVisible && setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  useEffect(() => {
    async function getLoads() {
      setIsLoading(true);
      await axios
        .post(`${process.env.NEXT_PUBLIC_EGG_MARKET}/API/loads/loads`, {
          origins: [],
          print_types: [],
          yolk_types: [],
          qualities: [],
          pack_types: [],
          types: [],
          lastID: "", //برای صفحه بندی استفاده می شود. برای دریافت اطلاعات بیشتر یعنی صفحه بعد باید آخرین آیدی رو وارد کنید.
        })
        .then((response) => {
          setIsLoading(false);
          setData(response.data.loads);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
    getLoads();
  }, []);

  useEffect(() => {
    async function getProvinces() {
      await axios
        .get(`${process.env.NEXT_PUBLIC_EGG_MARKET}/API/locations/provinces`)
        .then((response) => {
          setProvinces(response.data.provinces);
        })
        .catch((error) => {});
    }
    getProvinces();
  }, []);

  const checkHandler = (e, data) => {
    setSelected((prev) => ({
      ...prev,
      [data.id]: e.target.checked,
    }));
  };

  return (
    <>
      <div className="sticky top-0 bg-surface-secondary flex justify-between items-center p-6 z-10">
        <div className="flex gap-4 justify-start items-center">
          <button
            className="icon-light-bold-Right-1 text-2xl"
            onClick={() => back()}
          ></button>
          <h3 className="font-semibold text-xl text-default-900">معاملات من</h3>
        </div>
        {(dateFrom || dateTo || selected[0] || selected[1]) && (
          <button
            className="text-sm text-danger-900"
            onClick={() => {
              setDateFrom(null);
              setDateTo(null);
              setSelected({
                0: false,
                1: false,
              });
            }}
          >
            حذف همۀ فیلترها
          </button>
        )}
      </div>
      <div className={`px-6 tradeFilter relative ${isVisible ? "" : "hide"}`}>
        <p className="text-sm text-default-500 mb-2">تاریخ</p>
        <div className="flex gap-4">
          <button
            className="border border-[#C2C2C2] rounded-lg py-3 pr-4 pl-3 flex-1 flex justify-between items-center"
            onClick={() => document.getElementById("dateFromModal").showModal()}
          >
            <span className="text-sm text-default-500">از:</span>
            <p className="font-medium text-default-900">
              {dateFrom
                ? `${dateFrom.year}/${monthNames.indexOf(dateFrom.month) + 1}/${
                    dateFrom.day
                  }`
                : ""}
            </p>
            <span className="icon-light-linear-Calender-1 text-xl text-400"></span>
          </button>
          <button
            className="border border-[#C2C2C2] rounded-lg py-3 pr-4 pl-3 flex-1 flex justify-between items-center"
            onClick={() => document.getElementById("dateToModal").showModal()}
          >
            <span className="text-sm text-default-500">تا:</span>
            <p className="font-medium text-default-900">
              {dateTo
                ? `${dateTo.year}/${monthNames.indexOf(dateTo.month) + 1}/${
                    dateTo.day
                  }`
                : ""}
            </p>
            <span className="icon-light-linear-Calender-1 text-xl text-400"></span>
          </button>
        </div>
        <div className="mt-8 flex items-center gap-10">
          {items.map((item, index) => (
            <Checkbox
              key={item.id}
              data={item}
              onChange={checkHandler}
              checked={selected[index]}
              hasLine={false}
            />
          ))}
        </div>
      </div>
      <div className="px-4 mb-16 bg-surface-secondary">
        <div role="tablist" className="tabs tabs-lifted *:text-base">
          <a
            role="tab"
            className={`tab text-default-500 [--tab-border-color:#F5F5F5] ${
              activeTab === 1
                ? "tab-active [--tab-bg:var(--default-50)] text-tertiary font-medium"
                : ""
            }`}
            onClick={() => setActiveTab(1)}
          >
            در انتظار پرداخت
          </a>
          <a
            role="tab"
            className={`tab text-default-500 [--tab-border-color:#F5F5F5] ${
              activeTab === 2
                ? "tab-active [--tab-bg:var(--default-50)] text-tertiary font-medium"
                : ""
            }`}
            onClick={() => setActiveTab(2)}
          >
            معاملات انجام شده
          </a>
        </div>
        <div
          className={`py-6 px-4 bg-default-50 rounded-b-xl h-full ${
            activeTab === 1 ? "rounded-tl-xl" : "rounded-tr-xl"
          }`}
        >
          {activeTab === 1 ? (
            isLoading ? (
              <Loading />
            ) : data.length === 0 ? (
              <div className="flex flex-col items-center gap-6">
                <span className="icon-light-linear-Document-Justify-Right-1 text-[96px] text-default-300"></span>
                <p className="text-center text-default-400 text-lg mt-4">
                  شما هیچ فاکتور در انتظار پرداختی ندارید.
                </p>
              </div>
            ) : (
              data.map((card) => (
                <MyTradeCard
                  key={card.id}
                  card={card}
                  province={provinces.find(
                    (item) => item.id === card.origin_field1
                  )}
                  typeOfTrade="unDone"
                />
              ))
            )
          ) : isLoading ? (
            <Loading />
          ) : data.length === 0 ? (
            <div className="flex flex-col items-center gap-6">
              <span className="icon-light-linear-Document-Justify-Right-1 text-[96px] text-default-300"></span>
              <p className="text-center text-default-400 text-lg mt-4">
                شما هیچ معامله ای ندارید
              </p>
            </div>
          ) : (
            data.map((card, index, arr) => {
              let isEqual = false;
              if (index !== 0) {
                let previous = new Date(arr[index - 1].reg_date);
                previous = new Intl.DateTimeFormat("fa-IR").format(previous);
                let current = new Date(card.reg_date);
                current = new Intl.DateTimeFormat("fa-IR").format(current);
                isEqual = current === previous;
              }
              let date = new Date(card.reg_date);
              date = new Intl.DateTimeFormat("fa-IR").format(date).split("/");
              return (
                <>
                  {!isEqual && (
                    <div className="flex items-center justify-center gap-4 mt-4 mb-2">
                      <hr className="w-full border-default-300" />
                      <p className="text-xs text-default-500 basis-1 text-nowrap">
                        {`${date[2]} ${
                          monthNames[
                            date[1].replace(/[۰-۹]/g, (d) =>
                              "۰۱۲۳۴۵۶۷۸۹".indexOf(d)
                            ) - 1
                          ]
                        } ${date[0]}`}
                      </p>
                      <hr className="w-full border-default-300" />
                    </div>
                  )}
                  <MyTradeCard
                    key={card.id}
                    card={card}
                    province={provinces.find(
                      (item) => item.id === card.origin_field1
                    )}
                    typeOfTrade="done"
                  />
                </>
              );
            })
          )}
        </div>
      </div>
      <HistoryModal id="dateFromModal" setDateValue={setDateFrom} />
      <HistoryModal id="dateToModal" setDateValue={setDateTo} />
    </>
  );
}
