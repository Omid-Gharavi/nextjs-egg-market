"use client";
import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import BottomModal from "../Modal/BottomModal";

export default function IndividualFilters({
  filterOptions,
  filters,
  setFilters,
  filterHandler,
  setFilterValues,
  filterValues,
  provinces,
}) {
  const [selectedFilter, setSelectedFilter] = useState([]);
  return (
    <>
      {filterOptions.map((filter) => (
        <>
          {/* {index === 0 ? (
            <button
              className={`carousel-item text-default-700 text-sm p-3 py-1 rounded-3xl ${
                filterValues.available
                  ? "bg-purple-200"
                  : "bg-white border border-default-400"
              }`}
              onClick={() => {
                setFilters((prev) => ({
                  ...prev,
                  available: !filters.available,
                }));
                setFilterValues((prev) => ({
                  ...prev,
                  available: !filterValues.available,
                }));
              }}
            >
              فقط بارهای موجود
            </button>
          ) : (
            <> */}
          <button
            className={`flex items-center gap-1 carousel-item text-default-700 text-sm p-3 py-1 rounded-3xl ${
              // index === 2
              //   ? filterValues.weight.min !== 8 ||
              //     filterValues.weight.max !== 14
              //     ? "bg-purple-200"
              //     : "bg-white border border-default-400"
              //   :
              filterValues[filter.value].length > 0
                ? "bg-purple-200"
                : "bg-white border border-default-400"
            }`}
            onClick={() => {
              document.getElementById(`filterModal`).showModal();
              setSelectedFilter(filter);
            }}
          >
            <p>{filter.title}</p>
            <span className="icon-light-linear-Down-2 text-base text-default-700"></span>
          </button>
        </>
      ))}
      <BottomModal
        id="filterModal"
        title={selectedFilter.title}
        onClose={() => setSelectedFilter([])}
      >
        <form
          method="dialog"
          className="flex-0 flex justify-between items-center py-4 px-6"
        >
          <h3 className=" font-semibold text-lg text-default-900">
            {selectedFilter.title}
          </h3>
          <button
            className="btn btn-sm btn-circle btn-ghost"
            onClick={() => setSelectedFilter([])}
          >
            <span className="icon-light-bold-Close text-2xl text-[#2D264B]"></span>
          </button>
        </form>
        {selectedFilter.length !== 0 && (
          <RenderComponent
            selectedFilter={selectedFilter}
            filterHandler={filterHandler}
            filters={filters}
            filterValues={filterValues}
            setFilterValues={setFilterValues}
            setFilters={setFilters}
            provinces={provinces}
            setSelectedFilter={setSelectedFilter}
          />
        )}
      </BottomModal>
    </>
  );
}
function RenderComponent({
  selectedFilter,
  filters,
  filterHandler,
  filterValues,
  setFilterValues,
  setFilters,
  provinces,
  setSelectedFilter,
}) {
  var { value, title, renderComponent: MyComponent } = selectedFilter;
  return (
    <>
      <div className="flex-1">
        {value === "origins" ? (
          <MyComponent
            selected={filters[value]}
            setSelected={filterHandler}
            provinces={provinces}
          />
        ) : (
          <MyComponent selected={filters[value]} setSelected={filterHandler} />
        )}
      </div>
      <form
        method="dialog"
        className="flex-0 bg-default-50 border-t-default-300 w-full flex gap-3 px-6 py-4"
      >
        <Button
          type="button-primary"
          text="اعمال فیلتر"
          width="w-3/5"
          onClick={() => {
            setFilterValues(filters);
          }}
        />
        <Button
          type="button-primary-error"
          text="حذف فیلتر"
          width="w-2/5"
          onClick={() => {
            // if (value === "weight") {
            //   setFilters({
            //     ...filters,
            //     weight: { min: 8, max: 14 },
            //   });
            //   setFilterValues({
            //     ...filterValues,
            //     weight: { min: 8, max: 14 },
            //   });
            // } else {
            setFilters({
              ...filters,
              [value]: [],
            });
            setFilterValues({
              ...filterValues,
              [value]: [],
            });
            // }
          }}
        />
      </form>
    </>
  );
}
