"use client";
import { adjustWidthOfInput } from "@/utils/adjustWidthOfInput";
import React from "react";

const formItems = [
  {
    title: "پایه قیمتی",
    value: "price",
    placeholder: "مثلا ۵۵,۵۰۰",
    required: true,
  },
  {
    title: "وزن کارتن",
    value: "weight",
    placeholder: "مثلا ۱۱.۳",
    required: true,
  },
  {
    title: "تعداد کارتن",
    value: "quantity",
    placeholder: "مثلا ۳۶۰",
    required: true,
  },
  {
    title: "کرایه باربری",
    value: "fee",
    placeholder: "مثلا ۵,۵۰۰,۰۰۰",
    required: false,
  },
];

export default function BoxCalculation({ values, setValues }) {
  return (
    <div className="px-6">
      {formItems.map(({ title, value, placeholder, required }, index) => (
        <div key={index} className="flex justify-between items-center mb-6">
          <label htmlFor={value} className="text-default-900 font-medium">
            {title}
            {required && <span className="text-xs text-[#D33C30]">*</span>}
          </label>
          <div className="flex gap-1 w-3/5 items-center border border-[#C2C2C2] rounded-xl py-3 px-4 ">
            <input
              type="number"
              id={`boxCalculation${value}`}
              placeholder={placeholder}
              name={value}
              className={`bg-inherit text-lg font-black placeholder:text-default-400 placeholder:font-normal flex-none ${
                index === 0 || index === 3
                  ? values[value]
                    ? ""
                    : "w-full"
                  : "w-full"
              }`}
              value={values[value]}
              onChange={(e) => {
                console.log(e.target.value);
                setValues({ ...values, [value]: e.target.value });
                (index === 0 || index === 3) && e.target.value !== ""
                  ? adjustWidthOfInput(
                      document.getElementById(`boxCalculation${value}`)
                    )
                  : document
                      .getElementById(`boxCalculation${value}`)
                      .style.removeProperty("width");
              }}
            />
            {(index === 0 || index === 3) && (
              <span
                className={`${
                  values[value]
                    ? "flex-1 text-xs text-default-500 font-medium "
                    : "hidden"
                }`}
              >
                تومان
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
