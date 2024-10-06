import React from "react";
import CustomSelect from "./CustomSelect";
import CustomSearchSelect from "./CustomSearchSelect";

export default function InputSelect({
  name,
  label,
  options,
  register,
  setValue,
  isSearch = false,
  defaultValue = "",
  space = "col-span-1",
  isDirty,
}) {
  return (
    <div className={`flex flex-col gap-2 ${space}`}>
      <label htmlFor={name} className="font-medium text-base text-default-900">
        {label}
        <span className="text-danger-900 font-medium text-xs">*</span>
      </label>
      {isSearch ? (
        <CustomSearchSelect
          options={options}
          placeHolder="جستجوی استان ..."
          register={register}
          setValue={setValue}
          defaultValue={defaultValue}
          name={name}
          isDirty={isDirty}
        />
      ) : (
        <CustomSelect
          options={options}
          register={register}
          setValue={setValue}
          defaultValue={defaultValue}
          name={name}
          isDirty={isDirty}
        />
      )}
    </div>
  );
}
