"use client";
import React from "react";

const eggmarketBasedItems = [
  {
    title: "لوکس",
    value: "lux",
    default: "500",
  },
  {
    title: "زرده",
    value: "yolk",
    default: "1500",
  },
  {
    title: "پرینت دومینو",
    value: "dominoPrint",
    default: "200",
  },
  {
    title: "بدون پرینت",
    value: "withoutPrint",
    default: "-400",
  },
  {
    title: "یک ماهه",
    value: "oneMonth",
    default: "1500",
  },
];

export default function EggCalcaulation({ values, setValues }) {
  return (
    <div className="px-16">
      <div className="flex items-center justify-between mb-8">
        <label htmlFor="weight" className="text-default-900 font-medium">
          وزن کارتن
          <span className="text-xs text-[#D33C30]">*</span>
        </label>
        <input
          type="number"
          placeholder="مثلا ۱۱.۳"
          name="weight"
          className="text-lg py-3 px-4 border border-[#C2C2C2] rounded-xl placeholder:text-default-400 w-24"
          value={values.weight}
          onChange={(e) => setValues({ ...values, weight: e.target.value })}
        />
      </div>
      <div>
        {eggmarketBasedItems.map((item, index) => (
          <div className="flex justify-between mb-6" key={index + 1}>
            <CheckBox
              data={item}
              checked={values[item.value]}
              setValues={setValues}
              values={values}
            />
            <div
              className={`text-lg py-1 px-4 border border-[#C2C2C2] rounded-xl  w-24 text-center ${values[item.value] ? "text-default-900" : "text-default-400"
                }`}
            >
              {item.default}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckBox({ data, checked, setValues, values }) {
  return (
    <label className="label cursor-pointer gap-2 justify-start p-0">
      <input
        checked={checked}
        onChange={(e) =>
          setValues({ ...values, [data.value]: !values[data.value] })
        }
        type="checkbox"
        className="checkbox p-0.5 rounded border-2 border-default-500 [--chkbg:var(--tertiary)]"
      />
      <span
        class={`flex-1 text-sm ${checked ? "text-[#4F4A45]" : "text-[#AAAAAA]"
          } `}
      >
        {data.title}
      </span>
    </label>
  );
}
