"use client";
import HistoryModal from "@/components/Modal/HistoryModal";
import { monthNames } from "@/components/static";
import axios from "axios";
import moment from "jalali-moment";
import React, { useEffect, useState } from "react";

const weekdays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];

export default function Page() {
  let today = moment();
  const [activeTab, setActiveTab] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dateValue, setDateValue] = useState({
    year: today.jYear(),
    month: monthNames[today.jMonth()],
    day: today.jDate(),
    weekday: today.jDay(),
  });
  const [dayCounter, setDayCounter] = useState(0);

  const getDiference = () => {
    let m = moment(); // Parse a Jalaali date
    let date1 = m.format("YYYY/M/D");

    let x = moment(
      `${dateValue.year}/${monthNames.indexOf(dateValue.month) + 1}/${dateValue.day
      }`,
      "jYYYY/jM/jD"
    );
    let date2 = x.format("YYYY/M/D");

    date1 = date1.split("/");
    date2 = date2.split("/");

    var startDate = new Date(date1[0], date1[1] - 1, date1[2]); // 2000-01-01
    var endDate = new Date(date2[0], date2[1] - 1, date2[2]); // Today

    // Calculate the difference of two dates in total days
    function diffDays(d1, d2) {
      var ndays;
      var tv1 = d1.valueOf(); // msec since 1970
      var tv2 = d2.valueOf();

      ndays = (tv2 - tv1) / 1000 / 86400;
      ndays = Math.round(ndays - 0.5);
      return ndays;
    }
    return diffDays(startDate, endDate);
  };

  // useEffect(() => {
  //   async function getPrice() {
  //     await axios
  //       .get(
  //         `${process.env.NEXT_PUBLIC_EGG_MARKET
  //         }/API/prices/list/${getDiference()}`
  //       )
  //       .then((response) => {
  //         setIsLoading(false);
  //         setData(response.data);
  //       })
  //       .catch((error) => {
  //         setIsLoading(false);
  //       });
  //   }
  //   setDayCounter(getDiference());
  //   getPrice();
  // }, [dateValue]);
  useEffect(() => {
    async function getPrice() {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_EGG_MARKET
          }/API/prices/list/${getDiference()}`
        )
        .then((response) => {
          setIsLoading(false);
          setData(response.data);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
    setDayCounter(getDiference());
    getPrice();
  }, [dateValue]);

  return (
    <div className="relative max-w-[440px]">
      <div className="bg-surface-secondary p-4">
        <div className="flex items-center justify-between bg-default-50 px-3 border border-[rgb(194,194,194)] rounded-xl h-12">
          <button
            className="flex items-center gap-0.5"
            onClick={() => {
              setDayCounter(dayCounter - 1);
              today.subtract(Math.abs(dayCounter - 1), "jDay");
              setDateValue({
                year: today.jYear(),
                month: monthNames[today.jMonth()],
                day: today.jDate(),
                weekday: today.jDay(),
              });
            }}
          >
            <span className="icon-light-linear-Right-1 text-2xl text-default-500"></span>
            <span className="text-default-500 text-sm">روز قبل</span>
          </button>
          <button
            className="flex items-center gap-0.5"
            onClick={() =>
              document.getElementById("priceDateModal").showModal()
            }
          >
            <p className="flex items-center gap-1 text-default-900 font-medium">
              {`${weekdays[dateValue.weekday]}، ${dateValue.year}/${monthNames.indexOf(dateValue.month) + 1
                }/${dateValue.day}`}
            </p>
            <span className="icon-light-linear-Calender-1 text-xl text-primary"></span>
          </button>
          <button
            className={`flex items-center gap-0.5 ${dayCounter === 0 ? "text-default-300" : "text-default-500"
              }`}
            onClick={() => {
              if (dayCounter < 0) {
                setDayCounter(dayCounter + 1);
                today.subtract(Math.abs(dayCounter + 1), "jDay");
                setDateValue({
                  year: today.jYear(),
                  month: monthNames[today.jMonth()],
                  day: today.jDate(),
                  weekday: today.jDay(),
                });
              }
            }}
            disabled={dayCounter === 0 ? true : false}
          >
            <span className="text-sm">روز بعد</span>
            <span className="icon-light-linear-Left-1 text-2xl"></span>
          </button>
        </div>
      </div>
      <div className="px-4 mb-16">
        <div role="tablist" className="tabs tabs-lifted *:text-base ">
          <a
            role="tab"
            className={`tab text-default-500 [--tab-border-color:#F5F5F5] ${activeTab === 1
              ? "tab-active [--tab-bg:var(--default-50)]  text-tertiary font-medium"
              : ""
              }`}
            onClick={() => setActiveTab(1)}
          >
            پایه وزنی
          </a>
          <a
            role="tab"
            className={`tab text-default-500 [--tab-border-color:#F5F5F5] ${activeTab === 2
              ? "tab-active [--tab-bg:var(--default-50)]  text-tertiary font-medium"
              : ""
              }`}
            onClick={() => setActiveTab(2)}
          >
            پایه شهرها
          </a>
        </div>
        {isLoading ? (
          <p>
            <span className="icon-light-linear-loading"></span>
          </p>
        ) : (
          <div
            className={`py-6 px-4 bg-default-50 rounded-b-xl h-full ${activeTab === 1 ? "rounded-tl-xl" : "rounded-tr-xl"
              }`}
          >
            {activeTab === 1 ? (
              <>
                <div className="overflow-x-auto border border-default-200 rounded-lg mb-6">
                  <table className="table text-center rounded-lg">
                    {/* head */}
                    <thead className="text-xs text-default-900 font-normal bg-default-100">
                      <tr className="border-b border-default-200">
                        <th>
                          وزن{" "}
                          <span className="text-[10px] text-default-900">
                            (کیلوگرم)
                          </span>
                        </th>
                        <th className="border-l border-r border-default-200">
                          کمترین قیمت{" "}
                          <span className="text-[10px] text-default-900">
                            (تومان)
                          </span>
                        </th>
                        <th className="">
                          بیشترین قیمت{" "}
                          <span className="text-[10px] text-default-900">
                            (تومان)
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white *:border-b *:border-default-200">
                      {data.price_list
                        ?.filter((item) => item.type === "weight")
                        .map(
                          (
                            {
                              type_id: weightId,
                              price_1: minPrice,
                              price_2: maxPrice,
                            },
                            index
                          ) => (
                            <tr key={index} className="last:border-0">
                              <td className="text-xs">
                                {
                                  data.weights.find(
                                    (item) => item.id === weightId
                                  ).title
                                }
                              </td>
                              <td className="text-sm border-l border-r border-default-200">
                                {minPrice ? minPrice : "--"}
                              </td>
                              <td className="text-sm">
                                {maxPrice ? maxPrice : "--"}
                              </td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="overflow-x-auto border border-default-200 rounded-lg mb-6">
                <table className="table text-center rounded-lg">
                  {/* head */}
                  <thead className="text-sm text-default-900 font-normal bg-default-100">
                    <tr className="border-b border-default-200">
                      <th className="">شهرها</th>
                      <th className="border-l border-r border-default-200">
                        قیمت اولیه{" "}
                        <span className="text-xs font-normal text-default-900">
                          (تومان)
                        </span>
                      </th>
                      <th className="">
                        قیمت نهایی{" "}
                        <span className="text-xs font-normal text-default-900">
                          (تومان)
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white *:border-b *:border-default-200">
                    {data.price_list
                      ?.filter((item) => item.type === "city")
                      .map(
                        (
                          {
                            type_id: cityId,
                            price_1: firstPrice,
                            price_2: lastPrice,
                          },
                          index
                        ) => (
                          <tr key={index} className="last:border-0">
                            <td>
                              {
                                data.cities.find((item) => item.id === cityId)
                                  .title
                              }
                            </td>
                            <td className="border-l border-r border-default-200">
                              {firstPrice ? firstPrice : "--"}
                            </td>
                            <td>{lastPrice ? lastPrice : "--"}</td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
      <HistoryModal
        id="priceDateModal"
        dateValue={dateValue}
        setDateValue={setDateValue}
      />
    </div>
  );
}
