"use client";
import BoxCalculation from "@/components/calculator/BoxCalculation";
import EggCalcaulation from "@/components/calculator/EggCalcaulation";
import BottomModal from "@/components/Modal/BottomModal";
import useTrimPrice, { trimPrice } from "@/utils/trimPrice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { back } = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [boxValues, setBoxValues] = useState({
    price: "",
    weight: "",
    quantity: "",
    fee: "",
  });

  const [eggValues, setEggValues] = useState({
    weight: "",
    lux: false,
    yolk: false,
    dominoPrint: false,
    withoutPrint: false,
    oneMonth: false,
  });

  const [finalValue, setFinalValue] = useState({
    weightBasePrice: "",
    overallPrice: "",
    boxPrice: "",
    bulkPrice: "",
    eggPrice: "",
  });

  useEffect(() => {
    const weightBasePrice = boxValues.price;
    const overallPrice = Math.trunc(
      weightBasePrice * boxValues.quantity * boxValues.weight
    );
    const boxPrice = Math.trunc(overallPrice / boxValues.quantity);
    const bulkPrice = Math.trunc(boxPrice / 6);
    const eggPrice = trimPrice(Math.trunc(bulkPrice / 30));
    setFinalValue({
      weightBasePrice,
      overallPrice,
      boxPrice,
      bulkPrice,
      eggPrice,
    });
  }, [boxValues]);
  useEffect(() => {
    // setFinalValue({
    //   weightBasePrice: eggValues.price,
    //   overallPrice: "",
    //   boxPrice: "",
    //   bulkPrice: "",
    //   eggPrice: "",
    // });
  }, [eggValues]);

  return (
    <div className="px-4 pt-8 pb-20 h-screen flex flex-col">
      <div className="w-full flex justify-between items-center mb-6">
        <div className="flex gap-4 justify-start items-center">
          <button
            className="icon-light-bold-Right-1 text-2xl"
            onClick={() => back()}
          ></button>
          <h3 className="font-semibold text-xl text-default-900">ماشین حساب</h3>
        </div>
      </div>
      <div className="flex-1 flex flex-col h-full">
        <div role="tablist" className="tabs tabs-lifted flex">
          <a
            role="tab"
            className={`flex-1 tab text-default-500 [--tab-border-color:#F5F5F5] [--tab-border:0px] text-sm ${
              activeTab === 1
                ? "tab-active [--tab-bg:var(--default-50)] text-tertiary font-medium"
                : ""
            }`}
            onClick={() => setActiveTab(1)}
          >
            محاسبه قیمت کارتنی
          </a>
          <a
            role="tab"
            className={`flex-1 tab text-default-500 [--tab-border-color:#F5F5F5] [--tab-border:0px] text-sm ${
              activeTab === 2
                ? "tab-active [--tab-bg:var(--default-50)] text-tertiary font-medium"
                : ""
            }`}
            onClick={() => setActiveTab(2)}
          >
            کشف قیمت با پایه اگمارکت
          </a>
        </div>
        <div
          className={`flex-1 flex flex-col justify-between py-6 bg-default-50 rounded-b-xl ${
            activeTab === 1 ? "rounded-tl-xl" : "rounded-tr-xl"
          }`}
        >
          {activeTab === 1 ? (
            <BoxCalculation values={boxValues} setValues={setBoxValues} />
          ) : (
            <EggCalcaulation values={eggValues} setValues={setEggValues} />
          )}
          <div className="flex gap-3 px-6">
            <button
              onClick={() =>
                document.getElementById("calculateResultModal").showModal()
              }
              className={`button button-primary w-3/5 ${
                boxValues.price !== "" &&
                boxValues.weight !== "" &&
                boxValues.quantity !== ""
                  ? ""
                  : eggValues.weight !== ""
                  ? ""
                  : "disabled"
              }`}
              disabled={
                boxValues.price !== "" &&
                boxValues.weight !== "" &&
                boxValues.quantity !== ""
                  ? false
                  : eggValues.weight !== ""
                  ? false
                  : true
              }
            >
              محاسبه
            </button>
            <button
              className="border border-default-700 text-default-700 font-medium rounded-xl w-2/5"
              onClick={() => {
                setBoxValues({
                  price: "",
                  weight: "",
                  quantity: "",
                  fee: "",
                });
                setEggValues({
                  weight: "",
                  lux: false,
                  yolk: false,
                  dominoPrint: false,
                  withoutPrint: false,
                  oneMonth: false,
                });
              }}
            >
              پاک کردن فرم
            </button>
          </div>
        </div>
      </div>
      <BottomModal id="calculateResultModal">
        <form
          method="dialog"
          className="flex-0 flex justify-between items-center py-4 px-6 border-b border-default-300 bg-default-50"
        >
          <h3 className="text-sm text-tertiary">قیمت تمام شده</h3>
          <button className="btn btn-sm btn-circle btn-ghost">
            <span className="icon-light-bold-Close text-2xl text-[#2D264B]"></span>
          </button>
        </form>
        <div className="bg-default-50 pt-8 px-8 pb-2">
          <div className="mb-8">
            <div className="border border-default-300 rounded-lg *:border-b *:border-default-300 *:h-11 *:flex *:w-full ">
              <div className="*:leading-[44px] *:text-center last:border-b-0">
                <div className="text-default-900 w-2/5 bg-[#F1EFF5] border-l border-default-300 rounded-tr-lg">
                  قیمت پایه وزنی
                </div>
                <div className="text-lg text-[#0F0F0FCC] w-3/5">
                  {trimPrice(finalValue.weightBasePrice)}
                </div>
              </div>
              <div className="*:leading-[44px] *:text-center last:border-b-0">
                <div className="text-default-900 w-2/5 bg-[#F1EFF5] border-l border-default-300">
                  قیمت کل
                </div>
                <div className="text-lg text-[#0F0F0FCC] w-3/5">
                  {trimPrice(finalValue.overallPrice)}
                </div>
              </div>
              <div className="*:leading-[44px] *:text-center last:border-b-0">
                <div className="text-default-900 w-2/5 bg-[#F1EFF5] border-l border-default-300">
                  قیمت هر کارتن
                </div>
                <div className="text-lg text-[#0F0F0FCC] w-3/5">
                  {trimPrice(finalValue.boxPrice)}
                </div>
              </div>
              <div className="*:leading-[44px] *:text-center last:border-b-0">
                <div className="text-default-900 w-2/5 bg-[#F1EFF5] border-l border-default-300">
                  قیمت هر شانه
                </div>
                <div className="text-lg text-[#0F0F0FCC] w-3/5">
                  {trimPrice(finalValue.bulkPrice)}
                </div>
              </div>
              <div className="*:leading-[44px] *:text-center last:border-b-0">
                <div className="text-default-900 w-2/5 bg-[#F1EFF5] border-l border-default-300 rounded-br-lg">
                  قیمت هر تخم‌مرغ
                </div>
                <div className="text-lg text-[#0F0F0FCC] w-3/5">
                  {trimPrice(finalValue.eggPrice)}
                </div>
              </div>
            </div>
            <p className="mt-4 text-default-500 text-xs">
              قیمت‌ها به <span className="font-bold">تومان</span> است.
            </p>
          </div>
          <form method="dialog">
            <button className="border border-tertiary rounded-xl w-full text-tertiary font-bold py-3">
              بستن
            </button>
          </form>
        </div>
      </BottomModal>
    </div>
  );
}
