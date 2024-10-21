import Link from "next/link";
import React from "react";

export default function PriceSuggestionHeader() {
  return (
    <div className="relative">
      <div className="bg-gradient-to-b from-[#FCFCFC] to-[#D3D3D3] px-6 py-3">
        <div className="flex justify-between items-center mb-5">
          <p className="text-default-500 text-xs">
            برند <span className="text-tertiary text-sm">چکاوک کاشان</span>
          </p>
          <Link href="" className="underline text-xs text-default-500">
            رفتن به آگهی
          </Link>
        </div>
        <div className="flex gap-1 items-center">
          <span className="flex items-center">
            <span className="text-xl font-semibold text-default-900 ml-1">
              12.5
            </span>
            <span className="text-xs text-default-500">کیلو</span>
          </span>
          <span className=" bg-default-900 h-4 w-px"></span>
          <span className="flex items-center">
            <span className="text-xl font-semibold text-default-900 ml-1">
              260
            </span>
            <span className="text-xs text-default-500">کارتن</span>
          </span>
          <span className=" bg-default-900 h-4 w-px"></span>
          <span className="flex items-center">
            <span className="text-xl font-semibold text-default-900 ml-1">
              مشهد
            </span>
            <span className="text-xs text-default-500">(خراسان رضوی)</span>
          </span>
        </div>
      </div>
      <img
        src={"/assets/images/priceSuggestion.png"}
        alt="design picture"
        className="absolute w-full h-2.5 -bottom-2 left-0 right-0"
      />
    </div>
  );
}
