"use client";
import React, { useState } from "react";
import AllFilters from "./AllFilters";
import IndividualFilters from "./IndividualFilters";
import FullModal from "../Modal/FullModal";
import Quality from "../filterItems/Quality";
import Yolk from "../filterItems/Yolk";
import Print from "../filterItems/Print";
import OriginFilter from "../filterItems/OriginFilter";
import Pack from "../filterItems/Pack";

const filterOptions = [
  // {
  //   id: 0,
  //   title: "فقط بار های موجود",
  //   value: "available",
  // },
  // {
  //   id: 2,
  //   title: "وزن",
  //   value: "weight",
  //   renderComponent: Weight,
  // },
  // {
  //   id: 6,
  //   title: "برند",
  //   value: "brand",
  //   renderComponent: Brand,
  // },
  {
    title: "مبدأ بار",
    value: "origins",
    renderComponent: OriginFilter,
  },
  {
    title: "پرینت",
    value: "print_types",
    renderComponent: Print,
  },
  {
    title: "زرده",
    value: "yolk_types",
    renderComponent: Yolk,
  },
  {
    title: "کیفیت",
    value: "qualities",
    renderComponent: Quality,
  },
  {
    title: "بسته بندی",
    value: "pack_types",
    renderComponent: Pack,
  },
];

export default function FilterLayout({
  filterValues,
  setFilterValues,
  provinces,
}) {
  const [filters, setFilters] = useState(filterValues);
  const filterHandler = (name, value, type) => {
    if (type === "add") {
      setFilters((prev) => ({
        ...prev,
        [name]: [...filters[name], value],
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  return (
    <div className="flex items-center gap-1 py-3">
      <button
        className="relative flex justify-center gap-1 items-center rounded-lg bg-tertiary px-2 py-1.5"
        onClick={() => document.getElementById(`allFiltersModal`).showModal()}
      >
        <span className="icon-dark-linear-Filter-5 text-base"></span>
        <p className="text-xs text-default-50">فیلتر</p>
        <CheckFilters
          filterValues={filterValues}
          filterOptions={filterOptions}
        />
      </button>
      <FullModal id={`allFiltersModal`}>
        <AllFilters
          filterOptions={filterOptions}
          filters={filters}
          setFilters={setFilters}
          filterHandler={filterHandler}
          setFilterValues={setFilterValues}
          filterValues={filterValues}
          provinces={provinces}
        />
      </FullModal>
      <div className="carousel gap-1">
        <IndividualFilters
          filterOptions={filterOptions}
          filters={filters}
          setFilters={setFilters}
          filterHandler={filterHandler}
          setFilterValues={setFilterValues}
          filterValues={filterValues}
          provinces={provinces}
        />
      </div>
    </div>
  );
}

function CheckFilters({ filterValues, filterOptions }) {
  let selected = 0;
  filterOptions.map((filter) => {
    filterValues[filter.value]?.length > 0 && selected++;
    // if (index === 0) {
    //   filterValues.available && selected++;
    // } else if (index === 2) {
    //   (filterValues.weight?.min !== 8 || filterValues.weight?.max !== 14) &&
    //     selected++;
    // } else {
    //   filterValues[filter.value]?.length > 0 && selected++;
    // }
  });
  return (
    selected !== 0 && (
      <span className="absolute bg-primary border border-default-50 rounded-full mx-auto leading-4 h-4 w-4 -top-1 -left-1 text-purple-900 font-bold text-xs">
        {selected}
      </span>
    )
  );
}
