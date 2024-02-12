import { useEffect, useId, useRef, useState } from "react";
import CloseSVG from "./icons/Close";

export default function CurrencyInput({
  className = "",
  value,
  placeholder,
  placeholderIcon,
  additionalNote,
  additionalNoteIcon,
  isError = false,
  errorNote = "Please enter amount more that RM 1.00.",
  errorNoteIcon,
  disabled = false,
  required = false,
  currencyCode = "MYR",
  onChange,
  onBlur,
  onFocus,
  hasClearBtn = false,
}) {
  const inputId = useId();
  const noteIcon = isError ? errorNoteIcon : additionalNoteIcon;
  const noteMsg = isError ? errorNote : additionalNote;
  const inputRef = useRef(null);

  function formatValue({ value }) {
    const masked = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(value);
    const float = value;

    return { float, masked };
  }

  const initialValue = formatValue({ value: 0.0 }).masked;
  const [inputValue, setInputValue] = useState("");
  const [showClearBtn, setClearBtn] = useState(false);
  const [isFocused, setFocused] = useState(true);

  useEffect(() => {
    const newValue = isFocused ? initialValue : "";
    setInputValue(
      value === undefined || value === 0
        ? newValue
        : formatValue({ value }).masked
    );
    setFocused(value === undefined || value === 0 ? false : true);
  }, [inputValue, value]);

  const moveCursorToEnd = () => {
    inputRef.current?.setSelectionRange(
      inputRef.current?.value.length,
      inputRef.current?.value.length
    );
  };

  const formatInput = (event) => {
    const value =
      Number.isNaN(event.target.value) ||
      event.target.value === undefined ||
      event.target.value.indexOf("NaN") !== -1 ||
      event.target.value === ""
        ? initialValue
        : event.target.value;

    const numericValue =
      typeof value === "string"
        ? parseFloat(value.replace(/[^0-9-]/g, "")) / 100
        : 0.0;
    const { float, masked } = formatValue({ value: numericValue });
    setInputValue(masked);
    setClearBtn(inputValue !== initialValue);
    onChange && onChange(event, float, masked);
    moveCursorToEnd();
    return { float, masked };
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="relative">
        <input
          type="text"
          ref={inputRef}
          id={inputId}
          className={`disabled:text-neutral-300 disabled:bg-neutral-200 text-white bg-transparent block rounded-xl px-4 pb-2 pt-6 h-[56px] w-full text-caption-01 border-[1px] appearance-none focus:outline-none focus:ring-0 peer ${
            isError ? "border-red-500" : "border-neutral-300"
          }`}
          placeholder=" "
          value={inputValue}
          disabled={disabled}
          pattern="/^RM\s\d{1,3}(,\d{3})*(\.\d+)?$/"
          onChange={formatInput}
          onKeyUp={formatInput}
          onFocus={(e) => {
            moveCursorToEnd();
            setFocused(inputValue === initialValue ? false : true);
            setInputValue(inputValue || initialValue);
            setClearBtn(inputValue > initialValue);
            onFocus && onFocus(e);
          }}
          onBlur={(e) => {
            setFocused(inputValue === initialValue ? false : true);
            setClearBtn(false);
            setInputValue(inputValue === initialValue ? "" : inputValue);
            onBlur && onBlur(e);
          }}
          onKeyDown={moveCursorToEnd}
          autoComplete="off"
        />
        {hasClearBtn && (
          <label
            onClick={(event) => {
              setInputValue(initialValue);
              const { float, masked } = formatValue({ value: 0.0 });
              onChange && onChange(event, float, masked);
            }}
            className={`absolute w-3 h-3 fill-neutral-500 top-5 right-5 ${
              showClearBtn ? "opacity-100 cursor-pointer" : "opacity-0"
            }`}
            htmlFor={inputId}
          >
            <CloseSVG />
          </label>
        )}
        <label
          htmlFor={inputId}
          className="absolute flex flex-row gap-1 items-center duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] start-4 peer-disabled:text-neutral-300 text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          {placeholder}
          {required && "*"}
          {placeholderIcon && (
            <div className="w-4 h-4 fill-current">{placeholderIcon}</div>
          )}
        </label>
      </div>

      <div
        className={`flex flex-row items-center gap-2 ${
          isError ? "text-red-500" : "text-white"
        }`}
      >
        {noteIcon && <div className="w-4 h-4 fill-current">{noteIcon}</div>}
        {noteMsg && <p className="text-caption-02">{noteMsg}</p>}
      </div>
    </div>
  );
}
