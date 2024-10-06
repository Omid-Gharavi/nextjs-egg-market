import React from "react";

export default function FullFilterItem({
  children,
  title,
  setSelectedFilter,
}) {
  return (
    <>
      <div className="flex-0 flex gap-4 justify-start items-center px-6 py-8">
        <button
          className="flex items-center justify-center"
          onClick={() => setSelectedFilter([])}
        >
          <span className="icon-light-bold-Right-1 text-2xl"></span>
        </button>
        <h3 className="font-semibold text-lg text-default-900">{title}</h3>
      </div>
      {children}
    </>
  );
}
