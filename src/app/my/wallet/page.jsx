"use client";
import MyTransactionCard from "@/components/Cards/MyTransactionCard";
import BottomModal from "@/components/Modal/BottomModal";
import DepositTabs from "@/components/wallet/DepositTabs";
import WithdrawTab from "@/components/wallet/WithdrawTab";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const { back } = useRouter();

  return (
    <div className="bg-default-50 min-h-screen flex flex-col">
      <div className="flex-0 sticky top-0 bg-inherit w-full mb-2 p-8 gap-4 flex justify-start items-center">
        <button
          className="icon-light-bold-Right-1 text-2xl"
          onClick={() => back()}
        ></button>
        <h3 className="font-semibold text-xl text-default-900">کیف پول</h3>
      </div>
      <div className="flex-1 px-8">
        <div className="py-2 w-full rounded-xl bg-gradient-to-r from-tertiary to-purple-900 flex flex-col items-center mb-8">
          <div className="icon-light-outline-Wallet text-default-300 text-3xl mb-2"></div>
          <p className="text-sm mb-4 text-default-300">موجودی کیف پول:</p>
          <p>
            <span className="font-semibold text-3xl ml-2 text-default-50">
              450.000.000
            </span>
            <span className="text-xs text-[#C2C2C2]">تومان</span>
          </p>
        </div>
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => document.getElementById("depositModal").showModal()}
            className="flex-1 rounded-xl border border-[#7AD68F] bg-gradient-to-r from-[#A6E3B5] to-[#E9F8EC] py-3 flex flex-col items-start pr-4"
          >
            <div className="icon-light-outline-Wallet text-green-200 text-2xl mb-4"></div>
            <div className="flex gap-4 items-center">
              <p className="text-default-700 text-sm">افزایش موجودی</p>
              <span className="icon-light-linear-Left-2 text-2xl text-[#2D264B]"></span>
            </div>
          </button>
          <button
            onClick={() => document.getElementById("withdrawModal").showModal()}
            className="flex-1 rounded-xl border border-[#F28E86] bg-gradient-to-r from-[#F7B4AE] to-danger-100 py-3 flex flex-col items-start pr-4"
          >
            <div className="icon-light-outline-Wallet text-danger-900 text-2xl mb-4"></div>
            <div className="flex gap-4 items-center">
              <p className="text-default-700 text-sm">نقد کردن موجودی</p>
              <span className="icon-light-linear-Left-2 text-2xl text-[#2D264B]"></span>
            </div>
          </button>
        </div>
        <div className="mb-8">
          <p className="text-xs text-default-400 mb-2">
            آخرین گردش‌های کیف پول
          </p>
          <MyTransactionCard type="deposit" source="wallet" />
          {/* <MyTransactionCard type="withdraw" source="wallet" />
          <MyTransactionCard type="deposit" source="wallet" />
          <MyTransactionCard type="withdraw" source="wallet" /> */}
        </div>
      </div>
      <Link
        href="/my/wallet/transactions"
        className="flex-0 block border border-default-700 text-default-700 rounded-xl py-3 text-center mx-8 mb-6"
      >
        همه گردش‌های کیف پول
      </Link>
      <BottomModal id="depositModal" onClose={() => { }}>
        <form
          method="dialog"
          className="flex-0 flex justify-between items-center py-4 px-6 border-b border-default-300"
        >
          <h3 className="text-sm text-[#178230]">افزایش موجودی</h3>
          <button className="btn btn-sm btn-circle btn-ghost">
            <span className="icon-light-bold-Close text-2xl text-[#2D264B]"></span>
          </button>
        </form>
        <DepositTabs />
      </BottomModal>
      <BottomModal id="withdrawModal" onClose={() => { }}>
        <form
          method="dialog"
          className="flex-0 flex justify-between items-center py-4 px-6 border-b border-default-300"
        >
          <h3 className="text-sm text-[#D33C30]">نقد کردن موجودی</h3>
          <button className="btn btn-sm btn-circle btn-ghost">
            <span className="icon-light-bold-Close text-2xl text-[#2D264B]"></span>
          </button>
        </form>
        <WithdrawTab />
      </BottomModal>
    </div>
  );
}
