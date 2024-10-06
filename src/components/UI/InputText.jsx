import React from "react";

export default function InputText({
  placeholder,
  inputRef,
  onChange,
  onClick,
  label,
  smallText = "",
  required = false,
  name,
  space,
  className,
  icon,
  absolute
}) {
  const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

  return (
    <div className={`bg-inherit relative flex flex-col gap-2 ${space}`} onClick={onClick}>
      <label htmlFor={name} className="font-medium text-base text-default-900">
        {absolute && <span className="absolute top-[60%] left-[50%] translate-x-[-50%] translate-y-[-50%]">{`${absolute.year}/${months.indexOf(absolute.month) + 1}/${absolute.day}`}</span>}
        {label}{" "}
        {smallText ? (
          <span className="font-medium text-sm">{smallText}</span>
        ) : (
          ""
        )}
        {required && (
          <span className="text-danger-900 font-medium text-xs">*</span>
        )}
      </label>
      <input
        id={name}
        name={name}
        ref={inputRef}
        onChange={onChange}
        className={`bg-default-50 border border-default-400 rounded-xl px-4 h-[50px] text-default-900 font-normal text-base ${className}`}
        placeholder={placeholder}
      />
      {icon && <span className={`absolute left-3 top-[60%] text-xl translate-y-[-50%] ${icon}`}></span>}
    </div>
  );
}
