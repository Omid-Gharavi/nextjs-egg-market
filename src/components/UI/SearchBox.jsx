import React from "react";

export default function SearchBox({ text, onChange, value }) {
  return (
    <div className="flex gap-2 items-center rounded-xl border border-default-400 py-3 px-4">
      <span className="icon-Search text-2xl"></span>
      <input
        className="text-base text-default-400 w-full outline-none"
        placeholder={`جستجوی ${text}...`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
