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
  const [selected, setSelected] = useState(items);

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
    if (e.target.checked) {
      setSelected([...selected, data]);
    } else {
      setSelected(selected.filter((item) => item.id !== data.id));
    }
  };

  return (
    <div className="bg-surface-secondary">
      <div className="sticky top-0 bg-inherit flex justify-between items-center mb-2 py-6 px-6">
        <div className="flex gap-4 justify-start items-center">
          <button
            className="icon-light-bold-Right-1 text-2xl"
            onClick={() => back()}
          ></button>
          <h3 className="font-semibold text-xl text-default-900">معاملات من</h3>
        </div>
        {(dateFrom || dateTo || selected.length < 2) && (
          <button
            className="text-sm text-danger-900"
            onClick={() => {
              setDateFrom(null);
              setDateTo(null);
              setSelected(items);
            }}
          >
            حذف همۀ فیلترها
          </button>
        )}
      </div>
      <div className="pb-8">
        <div className="px-6">
          <p className="text-sm text-default-500 mb-2">تاریخ</p>
          <div className="flex gap-4">
            <button
              className="border border-[#C2C2C2] rounded-lg py-3 pr-4 pl-3 flex-1 flex justify-between items-center"
              onClick={() =>
                document.getElementById("dateFromModal").showModal()
              }
            >
              <span className="text-sm text-default-500">از:</span>
              <p className="font-medium text-default-900">
                {dateFrom
                  ? `${dateFrom.year}/${
                      monthNames.indexOf(dateFrom.month) + 1
                    }/${dateFrom.day}`
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
            {items.map((item) => (
              <Checkbox
                key={item.id}
                data={item}
                onChange={checkHandler}
                checked={
                  selected.findIndex((i) => i.id === item.id) !== -1
                    ? true
                    : false
                }
                hasLine={false}
              />
            ))}
          </div>
        </div>
        {isLoading ? (
          <Loading />
        ) : data.length === 0 ? (
          <p className="text-center text-default-400 text-lg mt-4">
            آگهی یافت نشد ...
          </p>
        ) : (
          <div className="px-4">
            {data.map((card, index, arr) => {
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
                  />
                </>
              );
            })}
          </div>
        )}
      </div>
      <HistoryModal id="dateFromModal" setDateValue={setDateFrom} />
      <HistoryModal id="dateToModal" setDateValue={setDateTo} />
    </div>
  );
}
