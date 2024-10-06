"use client";

import React, { useEffect, useState } from "react";
import SearchBox from "../../UI/SearchBox";
import Checkbox from "../../UI/Checkbox";
import SelectBadge from "../../UI/SelectBadge";
import { provinces } from "../../static";
import { cities } from "../../static";
import Cities from "./Cities";
import Provinces from "./Provinces";
import ScrollBar from "@/components/UI/ScrollBar";

export default function Origin({ selected, setSelected }) {
  const [searchResult, setSearchResult] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [allCitiesChecked, setAllCitiesChecked] = useState([]);
  const [partialCityChecked, setPartialCityChecked] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!selected.length && !allCitiesChecked.length && selectedBadges.length)
      setSelectedBadges([]);
  }, [selected]);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResult([]);
    } else {
      setSearchResult(cities.filter(({ title }) => title.includes(searchTerm)));
    }
  }, [searchTerm]);

  const handleAllChecked = (e, data) => {
    if (e.target.checked) {
      const checked = {
        id: data.id,
        title: `همه شهرهای ${provinces.find((p) => p.id === data.id).title}`,
        allOption: true,
      };

      setAllCitiesChecked((prev) => [...prev, data.id]);
      setSelectedBadges((prev) => [...prev, checked]);

      let filteredCities = cities.filter(
        (city) => city.province_id === data.id
      );
      filteredCities = filteredCities.filter(
        (item) => !selected.find((elem) => elem.id === item.id)
      );

      setSelected("origin", filteredCities, "origin");
    } else {
      // all cities option is deselected, so we delete all the badges for this province and uncheck all the cities
      setAllCitiesChecked(allCitiesChecked.filter((item) => item !== data.id));
      setSelected(
        "origin",
        selected.filter((item) => item.province_id !== data.id, "replace")
      );
      let values = selectedBadges;
      values = values.filter((item) => {
        if (item.allOption && item.id !== data.id) {
          // all cities option
          return item;
        } else if (item.province_id && item.province_id !== data.id) {
          // city
          return item;
        }
      });
      setSelectedBadges(values);
    }
  };

  const handleCityChecked = (e, data) => {
    if (e.target.checked) {
      if (!selected.find((city) => city.id === data.id)) {
        setSelected("origin", data, "origin");
        setSelectedBadges((prev) => [...prev, data]);
      }
    } else {
      //de select a city which its all cities option is selected
      if (allCitiesChecked.includes(data.province_id)) {
        // 1. remove that province from allCitiesChecked
        setAllCitiesChecked(
          allCitiesChecked.filter((item) => item !== data.province_id)
        );
        // 2. remove the unchecked city from the list of selected cities
        setSelected(
          "origin",
          selected.filter((city) => city !== String(data.id))
        );

        //3. add province to partialCityChecked

        setPartialCityChecked((prev) => [...prev, data.province_id]);

        //4. add badge for each city in this province individually and remove from allCities option

        let values = selectedBadges;
        // first I should save the previous values except this city all option and other cities in this province that have badge
        values = values.filter((item) => {
          if (item.allOption && item.id !== data.province_id) {
            // all cities option
            return item;
          } else if (
            item.province_id &&
            item.province_id !== data.province_id
          ) {
            return item;
          }
        });

        // then I will add the new values
        selected
          .filter(
            (item) =>
              item.province_id === data.province_id && item.id !== data.id
          )
          .map((elem) => {
            values = [...values, elem];
          });
        setSelectedBadges(values);
      } else {
        if (partialCityChecked.includes(data.province_id)) {
          let filtered = selected.find(
            (item) =>
              item.province_id &&
              item.province_id === data.province_id &&
              item.id !== data.id
          );
          if (!filtered)
            setPartialCityChecked(
              partialCityChecked.filter((item) => item !== data.province_id)
            );
        }
        setSelected(
          "origin",
          selected.filter((city) => city.id !== data.id),
          "replace"
        );
        setSelectedBadges(
          selectedBadges.filter((badge) => badge.id !== data.id)
        );
      }
    }
  };

  const closeBadgeHandler = (badge) => {
    if (badge.allOption) {
      // all cities option
      setAllCitiesChecked(allCitiesChecked.filter((item) => item !== badge.id));
      setSelected(
        "origin",
        selected.filter(
          (selectedCity) => selectedCity.province_id !== badge.id
        ),
        "replace"
      );
      setSelectedBadges(
        selectedBadges.filter((item) => {
          if (item.allOption && item.id !== badge.id) {
            // all cities option
            return item;
          } else if (item.province_id && item.province_id !== badge.id) {
            return item;
          }
        })
      );
    } else {
      if (allCitiesChecked.includes(badge.province_id)) {
        // 1. remove that province from allCitiesChecked
        setAllCitiesChecked(
          allCitiesChecked.filter((item) => item !== badge.province_id)
        );
        // 3. remove the unchecked city from the list of selected cities
        setSelected(
          "origin",
          selected.filter((city) => city.id !== badge.id)
        );

        //3. add province to partialCityChecked

        //4. add badge for each city in this province individually and remove from allCities option

        let values = selectedBadges;
        // first I should save the previous values except this city all option and other cities in this province that have badge
        values = values.filter((item) => {
          if (item.allOption && item.id !== badge.province_id) {
            // all cities option
            return item;
          } else if (
            item.province_id &&
            item.province_id !== badge.province_id
          ) {
            return item;
          }
        });

        // then I will add the new values
        selected
          .filter(
            (item) =>
              item.province_id === badge.province_id && item.id !== badge.id
          )
          .map((elem) => {
            values = [...values, elem];
          });
        setSelectedBadges(values);
      } else {
        setSelected(
          "origin",
          selected.filter((city) => city.id !== badge.id),
          "replace"
        );
        setSelectedBadges(selectedBadges.filter((b) => b.id !== badge.id));
      }
    }
  };

  return (
    <div className="pt-4">
      <div className="px-8 mb-8">
        <SearchBox
          text="شهر یا استان"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="pr-4">
          {selectedBadges.length !== 0 && (
            <div className="flex">
              <div className="mt-8 gap-2 carousel">
                {selectedBadges?.map((badge) => (
                  <div key={badge.id} className="carousel-item">
                    <SelectBadge badge={badge} onClose={closeBadgeHandler} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <ScrollBar>
        {searchResult.length ? (
          searchResult.map((data) => (
            <Checkbox
              key={data.id}
              data={data}
              onChange={handleCityChecked}
              checked={selected?.find((s) => s.id === data.id)}
            />
          ))
        ) : selectedProvince.length === 0 ? (
          <Provinces
            provinces={provinces}
            provinceClickHandler={(province) => setSelectedProvince(province)}
          />
        ) : (
          <Cities
            cities={cities.filter(
              (city) => city.province_id === selectedProvince.id
            )}
            backClickHandler={() => setSelectedProvince([])}
            provinceName={
              provinces.find((province) => province.id === selectedProvince.id)
                .title
            }
            handleAllChecked={handleAllChecked}
            handleCityChecked={handleCityChecked}
            selectedProvince={selectedProvince}
            allCitiesChecked={allCitiesChecked}
            selectedCities={selected}
            partialCityChecked={partialCityChecked}
          />
        )}
      </ScrollBar>
    </div>
  );
}
