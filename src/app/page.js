"use client";

import SaleCard from "@/components/Homepage/SaleCard";
import BuyModal from "@/components/Modal/BuyModal";
import { monthNames } from "@/components/static";
import Button from "@/components/UI/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./loading";
import FilterLayout from "@/components/filters/FilterLayout";
import { useRouter } from "next/navigation";
import BottomModal from "@/components/Modal/BottomModal";

export default function Home() {
  const router = useRouter();
  const [lastID, setLastID] = useState("");
  const [selected, setSelected] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loadMore, setloadMore] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [filterValues, setFilterValues] = useState({
    origins: [],
    print_types: [],
    yolk_types: [],
    qualities: [],
    pack_types: [],
  });

  useEffect(() => {
    isAvailable
      ? setFilteredData(data.filter((item) => item.status !== "sold"))
      : setFilteredData(data);
  }, [isAvailable]);

  useEffect(() => {
    async function getLoads(lastID) {
      setIsLoading(true);
      await axios
        .post(`${process.env.NEXT_PUBLIC_EGG_MARKET}/API/loads/loads`, {
          ...filterValues,
          types: [],
          lastID: lastID, //برای صفحه بندی استفاده می شود. برای دریافت اطلاعات بیشتر یعنی صفحه بعد باید آخرین آیدی رو وارد کنید.
        })
        .then((response) => {
          setIsLoading(false);
          if (filteredData.length === 0 || !loadMore) {
            setData(
              response.data.loads.filter((item) => item.status !== "expired")
            );
            setFilteredData(
              response.data.loads.filter((item) => item.status !== "expired")
            );
          } else {
            let temp = filteredData;
            response.data.loads
              .filter((item) => item.status !== "expired")
              .map((load) => (temp = [...temp, load]));
            setData(temp);
            setFilteredData(temp);
            setloadMore(false);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    }
    getLoads(lastID);
  }, [lastID, filterValues, router, data, loadMore]);

  useEffect(() => {
    async function getProvinces() {
      await axios
        .get(`${process.env.NEXT_PUBLIC_EGG_MARKET}/API/locations/provinces`)
        .then((response) => {
          setProvinces(response.data.provinces);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getProvinces();
  }, []);

  // useEffect(() => {
  //   let filtered = filteredData;
  //   if (filterValues.available) {
  //     filtered = filtered.filter((item) => item.status !== "sold");
  //   } else if (filterValues.brand.length > 0) {
  //     filtered = filtered.filter((item) => {
  //       let brand = item.details.find(
  //         (item) => item.title === "نام مجموعه"
  //       )?.value;
  //       if (BrandOptions.find((i) => i.title === brand)) return item;
  //     });
  //   } else if (
  //     filterValues.weight.min !== 8 ||
  //     filterValues.weight.max !== 14
  //   ) {
  //     filtered = filtered.filter((item) => {
  //       let weight = item.details.find(
  //         (item) => item.title === "وزن کارتن"
  //       )?.value;
  //       if (
  //         Number(weight) > filterValues.weight.min &&
  //         Number(weight) < filterValues.weight.max
  //       )
  //         return item;
  //     });
  //   } else {
  //     filtered = data;
  //   }
  //   setFilteredData(filtered);
  // }, [
  //   data,
  //   filterValues.available,
  //   filterValues.brand,
  //   filterValues.weight.min,
  //   filterValues.weight.max,
  // ]);

  return (
    <main>
      <div className="sticky top-0 h-[55px] z-10 px-2 bg-surface-secondary filterShadow">
        <FilterLayout
          setIsAvailable={() => setIsAvailable(!isAvailable)}
          isAvailable={isAvailable}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          provinces={provinces}
        />
      </div>
      <div className="px-4 pb-32">
        {isLoading && filteredData.length === 0 ? (
          <Loading />
        ) : filteredData.length === 0 ? (
          <p className="text-center mt-4 text-default-500">باری وجود ندارد</p>
        ) : (
          <>
            <div className="mb-4">
              {filteredData.map((load, index, arr) => {
                let isEqual = false;
                if (index !== 0) {
                  let previous = new Date(arr[index - 1].reg_just_date);
                  previous = new Intl.DateTimeFormat("fa-IR").format(previous);
                  let current = new Date(load.reg_just_date);
                  current = new Intl.DateTimeFormat("fa-IR").format(current);
                  isEqual = current === previous;
                }
                let date = new Date(load.reg_just_date);
                date = new Intl.DateTimeFormat("fa-IR").format(date).split("/");
                return (
                  <div key={index}>
                    {isEqual ? (
                      ""
                    ) : (
                      <>
                        <div className="flex items-center justify-center gap-4 my-2">
                          <hr className="w-full border-default-300" />
                          <p className="text-sm font-semibold text-default-900 basis-1 text-nowrap">
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
                        <div className="flex items-center justify-between text-default-500 my-2">
                          <p className="font-bold text-sm">
                            تعداد بارهای اعلامی:
                          </p>
                          <p className="text-xs">{`${
                            filteredData.filter(
                              (item) =>
                                item.reg_just_date === load.reg_just_date
                            ).length
                          } بار تخم مرغ`}</p>
                        </div>
                      </>
                    )}
                    <SaleCard
                      key={load.loadId}
                      load={load}
                      province={provinces.find(
                        (item) => item.id === load.origin_field1
                      )}
                      setSelected={setSelected}
                    />
                  </div>
                );
              })}
            </div>
            <Button
              type="button-primary-2"
              text="مشاهده آگهی های بیشتر"
              width="w-full"
              onClick={() => {
                setLastID(filteredData[filteredData.length - 1].loadID);
                setloadMore(true);
              }}
              loading={isLoading}
            />
            <BottomModal id="modal_buy" onClose={() => setSelected("")}>
              <form
                method="dialog"
                className="p-4 flex justify-between items-center border-b border-default-300"
              >
                <p className="text-tertiary">پیش‌فاکتور</p>
                <button onClick={() => setSelected("")}>
                  <span className="icon-light-bold-Close text-2xl"></span>
                </button>
              </form>
              {selected && (
                <BuyModal
                  load={filteredData.find((item) => item.loadID === selected)}
                  setSelected={setSelected}
                />
              )}
            </BottomModal>
          </>
        )}
      </div>
    </main>
  );
}
