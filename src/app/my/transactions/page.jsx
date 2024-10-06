"use client";
import MyTransactionCard from "@/components/Cards/MyTransactionCard";
import FullModal from "@/components/Modal/FullModal";
import { monthNames, transactions } from "@/components/static";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import TransactionFilter from "@/components/TransactionPage/TransactionFilter";

export default function Page() {
  const { back } = useRouter();
  const [filterValues, setFilterValues] = useState({
    dateFrom: "",
    dateTo: "",
    priceFrom: "",
    priceTo: "",
    filter: 1,
  });

  return (
    <>
      <div className="bg-default-50 min-h-screen">
        <div className="sticky top-0 bg-inherit flex justify-between items-center mb-2 py-6 px-6">
          <div className="flex gap-4 justify-start items-center">
            <button
              className="icon-light-bold-Right-1 text-2xl"
              onClick={() => back()}
            ></button>
            <h3 className="font-semibold text-xl text-default-900">
              گردش حساب
            </h3>
          </div>
          <button
            onClick={() =>
              document.getElementById("transactionModal").showModal()
            }
          >
            <span className="icon-light-linear-Filter-1 text-2xl text-purple-900"></span>
          </button>
        </div>
        <div className="pb-8">
          {!transactions?.length ? (
            <p className="text-center text-default-400 text-lg mt-4">
              شما فعالیتی ندارید
            </p>
          ) : (
            <div className="px-4">
              {transactions.map((card, index, arr) => {
                const prevCard = arr[index - 1];
                const prevMonth = Number(prevCard?.time.split("/")[1]);
                const prevYear = Number(prevCard?.time.split("/")[0]);
                const curMonth = Number(card.time.split("/")[1]);
                const curYear = Number(card.time.split("/")[0]);
                return (
                  <>
                    {(prevMonth !== curMonth || prevYear !== curYear) && (
                      <div className="flex items-center justify-center gap-4 mt-4 mb-2">
                        <hr className="w-full border-default-300" />
                        <p className="text-xs text-default-500 basis-1 text-nowrap">
                          {monthNames[curMonth - 1]} {curYear}
                        </p>
                        <hr className="w-full border-default-300" />
                      </div>
                    )}
                    <MyTransactionCard
                      key={card.id}
                      type={card.type}
                      source="transaction"
                    />
                  </>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <FullModal id="transactionModal">
        <TransactionFilter
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          source="transactions"
        />
      </FullModal>
    </>
  );
}
