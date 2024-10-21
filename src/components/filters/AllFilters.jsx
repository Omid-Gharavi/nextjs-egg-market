import React, { useState } from "react";
import FullFilterItem from "./FullFilterItem";
import Button from "../UI/Button";
import {
  PackOptions,
  PrintOptions,
  QualityOptions,
  YolkOptions,
} from "../static";

function AllFilters({
  filters,
  setFilters,
  setFilterValues,
  filterHandler,
  filterOptions,
  filterValues,
  provinces,
  setIsAvailable,
  isAvailable,
}) {
  const [selectedFilter, setSelectedFilter] = useState([]);
  return (
    <>
      {selectedFilter.length === 0 ? (
        <>
          <div className="flex-0 flex justify-between items-center px-6 py-8">
            <div className="flex gap-4 justify-center items-center">
              <form method="dialog" className="flex items-center">
                <button className="icon-light-bold-Close text-2xl"></button>
              </form>
              <h3 className="font-semibold text-lg text-default-900">
                فیلترها
              </h3>
            </div>
            {filterOptions.find(
              (item) => filterValues[item.value]?.length > 0
            ) ? (
              <button
                className="text-sm text-danger-900"
                onClick={() => {
                  setFilters({
                    origins: [],
                    print_types: [],
                    yolk_types: [],
                    qualities: [],
                    pack_types: [],
                  });
                  setFilterValues({
                    origins: [],
                    print_types: [],
                    yolk_types: [],
                    qualities: [],
                    pack_types: [],
                  });
                }}
              >
                حذف همۀ فیلترها
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="flex-1 filterList py-4 px-6">
            {filterOptions.map((filter, index) => (
              <div key={filter.id} className="line mb-2 pb-2">
                {index === 0 ? (
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="text-base text-default-700 ">
                        فقط بارهای موجود
                      </span>
                      <input
                        type="checkbox"
                        className="toggle toggle-lg border-default-300 [--tglbg:--default-300] bg-white hover:bg-default-100 checked:border-purple-500 checked:[--tglbg:--purple-500] checked:hover:bg-default-100 rotate-180"
                        checked={isAvailable}
                        onChange={setIsAvailable}
                      // onChange={() => {
                      //   setFilters((prev) => ({
                      //     ...prev,
                      //     available: !filters.available,
                      //   }));
                      //   setFilterValues((prev) => ({
                      //     ...prev,
                      //     available: !filterValues.available,
                      //   }));
                      // }}
                      />
                    </label>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setSelectedFilter(filter)}
                      className="w-full flex justify-between items-center pb-2"
                    >
                      <div className="flex gap-2 items-center">
                        <span className="text-base text-purple-600 font-medium">
                          {filter.title}
                        </span>
                        {
                          /* {filter.id === 2
                          ? (filterValues.weight.min !== 8 ||
                              filterValues.weight.max !== 14) && (
                              <span className="h-1 w-1 rounded-full bg-primary"></span>
                            )
                          :  */
                          filterValues[filter.value].length !== 0 && (
                            <span className="h-1 w-1 rounded-full bg-primary"></span>
                          )
                        }
                      </div>
                      <span className="icon-light-bold-Left-2 text-default-700 text-2xl"></span>
                    </button>
                    <div className="font-bold text-xs text-default-400">
                      {(() => {
                        switch (filter.value) {
                          case "origins": {
                            return filterValues[filter.value].map(
                              (s, index) => {
                                let title = provinces.find(
                                  (item) => item.id === String(s)
                                ).title;
                                if (index === 0) {
                                  return <span key={index + 1}>{title}</span>;
                                } else {
                                  return <span key={index + 1}>{`، ${title}`}</span>;
                                }
                              }
                            );
                          }
                          case "qualities": {
                            return filterValues[filter.value].map(
                              (s, index) => {
                                let { title } = QualityOptions.find(
                                  (item) => item.value === s
                                );
                                if (index === 0) {
                                  return <span key={index + 1}>{title}</span>;
                                } else {
                                  return <span key={index + 1}>{`, ${title}`}</span>;
                                }
                              }
                            );
                          }
                          case "print_types":
                            return filterValues[filter.value].map(
                              (s, index) => {
                                let { title } = PrintOptions.find(
                                  (item) => item.value === s
                                );
                                if (index === 0) {
                                  return <span key={index + 1}>{title}</span>;
                                } else {
                                  return <span key={index + 1}>{`, ${title}`}</span>;
                                }
                              }
                            );
                          case "yolk_types":
                            return filterValues[filter.value].map(
                              (s, index) => {
                                let { title } = YolkOptions.find(
                                  (item) => item.value === s
                                );
                                if (index === 0) {
                                  return title;
                                } else {
                                  return `, ${title}`;
                                }
                              }
                            );
                          case "pack_types":
                            return filterValues[filter.value].map(
                              (s, index) => {
                                let { title } = PackOptions.find(
                                  (item) => item.value === s
                                );
                                if (index === 0) {
                                  return title;
                                } else {
                                  return `, ${title}`;
                                }
                              }
                            );
                          // case "weight":
                          //   return (
                          //     (filterValues.weight.min !== 8 ||
                          //       filterValues.weight.max !== 14) &&
                          //     `${filterValues.weight.min} تا ${filterValues.weight.max} کیلوگرم`
                          //   );
                          // case "brand":
                          //   return filterValues[filter.value].map((s, index) => {
                          //     if (index === 0) {
                          //       return <span>{s.title}</span>;
                          //     } else {
                          //       return <span>{`, ${s.title}`}</span>;
                          //     }
                          //   });
                          default:
                            return null;
                        }
                      })()}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <form
            method="dialog"
            className="flex-0 bg-white border-t-default-300 modalShadow px-6 py-4 w-full"
          >
            <Button
              type="button-primary"
              text="مشاهده آگهی ها"
              onClick={() => { }}
              width="w-full"
            />
          </form>
        </>
      ) : (
        <RenderComponent
          selectedFilter={selectedFilter}
          filters={filters}
          filterHandler={filterHandler}
          setFilters={setFilters}
          setSelectedFilter={setSelectedFilter}
          setFilterValues={setFilterValues}
          filterValues={filterValues}
          provinces={provinces}
        />
      )}
    </>
  );
}

export default AllFilters;

function RenderComponent({
  selectedFilter,
  filters,
  filterHandler,
  setFilters,
  setSelectedFilter,
  setFilterValues,
  filterValues,
  provinces,
}) {
  var { id, title, value, renderComponent: MyComponent } = selectedFilter;

  return (
    <FullFilterItem
      key={id}
      title={title}
      setFilters={setFilters}
      filters={filters}
      filterValues={filterValues}
      setSelectedFilter={setSelectedFilter}
      setFilterValues={setFilterValues}
    >
      <div class="flex-1">
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
      <div className="flex-0 bg-white border-t-default-300 modalShadow flex gap-3 px-6 py-4">
        <Button
          type="button-primary"
          text="اعمال فیلتر"
          width="w-full"
          onClick={() => {
            setFilterValues(filters);
            setSelectedFilter([]);
          }}
        />
        <Button
          type="button-primary-error"
          text="حذف فیلتر"
          width="w-2/5"
          onClick={() => {
            setSelectedFilter([]);
            // if (value === "weight") {
            //   setFilters({
            //     ...filters,
            //     weight: { min: 8, max: 14 },
            //   });
            //   setFilterValues({
            //     ...filterValues,
            //     weight: { min: 8, max: 14 },
            //   });
            // }
            // else {
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
      </div>
    </FullFilterItem>
  );
}
