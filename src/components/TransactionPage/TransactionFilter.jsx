import React, { useState } from "react";
import Button from "../UI/Button";
import { monthNames } from "../static";
import HistoryModal from "../Modal/HistoryModal";
import TransFilterSelect from "../UI/TransFilterSelect";
import Checkbox from "../UI/Checkbox";

export default function TransactionFilter({
  filterValues,
  setFilterValues,
  source,
}) {
  const [filters, setFilters] = useState(filterValues);
  return (
    <>
      <div className="flex-0 flex gap-4 items-center px-6 py-8 w-full bg-inherit">
        <form method="dialog" className="flex items-center">
          <button className="icon-light-bold-Close text-2xl"></button>
        </form>
        <h3 className="font-semibold text-lg text-default-900">
          {source === "transactions" ? "فیلتر گردش حساب" : "فیلتر گردش کیف پول"}
        </h3>
      </div>
      <div className="flex-1">
        <div className="grid grid-cols-2 items-end grid-rows-3 gap-x-4 gap-y-8 px-6">
          <div className="col-span-1">
            <label htmlFor="date" className="text-sm text-default-500">
              تاریخ
            </label>
            <div
              onClick={() =>
                document.getElementById("transactionFromDateModal").showModal()
              }
              className={`mt-2 w-full h-[50px] border border-[#C2C2C2] rounded-xl pr-4 pl-3 flex-1 flex justify-between items-center ${
                filters?.dateFrom ? "bg-inherit" : "bg-surface-secondary"
              }`}
            >
              <span className="text-sm text-default-500">از:</span>
              <p className="font-medium text-default-900 text-base">
                {filters.dateFrom
                  ? `${filters.dateFrom.year}/${
                      monthNames.indexOf(filters.dateFrom.month) + 1
                    }/${filters.dateFrom.day}`
                  : ""}
              </p>
              <span className="icon-light-linear-Calender-1 text-xl text-400"></span>
            </div>
          </div>
          <div className="col-span-1">
            <div
              onClick={() =>
                document.getElementById("transactionToDateModal").showModal()
              }
              className={`mt-2 w-full h-[50px] border border-[#C2C2C2] rounded-xl pr-4 pl-3 flex-1 flex justify-between items-center ${
                filters.dateTo ? "bg-inherit" : "bg-surface-secondary"
              }`}
            >
              <span className="text-sm text-default-500">تا:</span>
              <p className="font-medium text-default-900 text-base">
                {filters.dateTo
                  ? `${filters.dateTo.year}/${
                      monthNames.indexOf(filters.dateTo.month) + 1
                    }/${filters.dateTo.day}`
                  : ""}
              </p>
              <span className="icon-light-linear-Calender-1 text-xl text-400"></span>
            </div>
          </div>
          <div className="col-span-1">
            <label htmlFor="priceFrom" className="text-sm text-default-500">
              مبلغ
            </label>
            <label
              className={`mt-2 w-full h-[50px] border border-[#C2C2C2] rounded-xl pr-4 pl-7 flex-1 flex justify-between items-center  ${
                filters.priceFrom ? "" : "bg-surface-secondary"
              }`}
            >
              <span className="text-sm text-default-500 ml-6">از: </span>
              <input
                id="priceFrom"
                className="font-medium text-default-900 bg-inherit w-full"
                type="text"
                value={filters.priceFrom}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceFrom: e.target.value,
                  })
                }
              />
              <p className="mr-1 text-xs text-500">تومان</p>
            </label>
          </div>
          <div className="col-span-1">
            <label
              htmlFor="priceTo"
              className={`mt-2 w-full h-[50px] border border-[#C2C2C2] rounded-xl pr-4 pl-7 flex-1 flex justify-between items-center  ${
                filters.priceTo ? "" : "bg-surface-secondary"
              }`}
            >
              <span className="text-sm text-default-500 ml-6">تا:</span>
              <input
                id="priceTo"
                className="font-medium text-default-900 bg-inherit w-full"
                type="text"
                value={filters.priceTo}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priceTo: e.target.value,
                  })
                }
              />
              <p className="mr-1 text-xs text-500">تومان</p>
            </label>
          </div>
          {source === "transaction" ? (
            <div className="col-span-2">
              <label htmlFor="date" className="text-sm text-default-500">
                نوع فیلتر
              </label>
              <TransFilterSelect
                value={filters.filter}
                setFilters={(id) => setFilters({ ...filters, filter: id })}
              />
            </div>
          ) : (
            <div className="flex gap-4 self-start">
              <Checkbox
                data={{ id: 1, title: "واریز" }}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({ ...filters, filter: [...filters.filter, 1] });
                  } else {
                    setFilters({
                      ...filters,
                      filter: filters.filter.filter((i) => i !== 1),
                    });
                  }
                }}
                checked={filters.filter.includes(1)}
                hasLine={false}
              />
              <Checkbox
                data={{ id: 2, title: "برداشت" }}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({ ...filters, filter: [...filters.filter, 2] });
                  } else {
                    setFilters({
                      ...filters,
                      filter: filters.filter.filter((i) => i !== 2),
                    });
                  }
                }}
                checked={filters.filter.includes(2)}
                hasLine={false}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex-0 bg-inherit border-t-default-300 w-full flex gap-3 px-6 py-4">
        <form method="dialog" className="w-3/5">
          <button
            className={`button button-primary w-full`}
            onClick={() => setFilterValues(filters)}
          >
            اعمال فیلتر
          </button>
        </form>
        <Button
          type="button-primary-error"
          text="حذف فیلتر"
          width="w-2/5"
          onClick={() => {
            setFilters({
              dateFrom: "",
              dateTo: "",
              priceFrom: "",
              priceTo: "",
              filter: [1, 2],
            });
            setFilterValues({
              dateFrom: "",
              dateTo: "",
              priceFrom: "",
              priceTo: "",
              filter: [1, 2],
            });
          }}
        />
      </div>
      <HistoryModal
        id="transactionFromDateModal"
        setDateValue={(data) => setFilters({ ...filters, dateFrom: data })}
      />
      <HistoryModal
        id="transactionToDateModal"
        setDateValue={(data) => setFilters({ ...filters, dateTo: data })}
      />
    </>
  );
}
