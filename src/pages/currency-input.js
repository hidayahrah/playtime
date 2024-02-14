import { Bungee } from "next/font/google";
import { useState } from "react";
import CurrencyInput from "@/components/CurrencyInput";
import MoneySVG from "@/components/icons/Money";
import InfoCircleSVG from "@/components/icons/InfoCircle";
import WarningSVG from "@/components/icons/Warning";
import { CurrencyCode } from "@/lib/currencyCode";

export const font = Bungee({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function CurrencyInputPage() {
  const [isCopied, setCopy] = useState(false);
  const [value, setValue] = useState();
  const [valueMasked, setValueMasked] = useState();
  const [hasError, setError] = useState(false);
  const [currencyCode, setCurrencyCode] = useState(CurrencyCode[72]?.code);
  const min = 0.1;

  function copyValue() {
    navigator.clipboard.writeText(valueMasked ? valueMasked : "");
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  }

  return (
    <>
      <div className="relative h-full bg-[#171908] flex flex-col gap-12 items-start justify-center px-10 md:px-64">
        <div className="w-full flex flex-col md:flex-row justify-between items-center">
          <p className="text-md w-full">Select your currency:</p>
          <select
            className="appearance-none border-none outline-none w-full h-12 p-2 rounded-lg text-white bg-[#314640]"
            onChange={(e) => {
              setError(false);
              setValue(0);
              setValueMasked("");
              setCurrencyCode(e.target.value);
            }}
            defaultValue={currencyCode}
          >
            {CurrencyCode.map((currency, i) => (
              <option key={i} value={currency.code}>
                {currency?.code}-{currency?.name}
              </option>
            ))}
          </select>
        </div>
        <CurrencyInput
          className="w-full"
          value={value}
          placeholder="Enter amount"
          placeholderIcon={<MoneySVG />}
          additionalNote={`Enter your amount here. Minimum amount is ${currencyCode} ${min.toFixed(
            2
          )}`}
          additionalNoteIcon={<InfoCircleSVG />}
          isError={hasError}
          errorNote="Please enter amount more than the minimum amount."
          errorNoteIcon={<WarningSVG />}
          currencyCode={currencyCode}
          onChange={(e, float, masked) => {
            setError(float < min);
            setValue(float);
            setValueMasked(masked);
          }}
          onBlur={(e) => {
            const checkError = value && value < min ? true : false;
            setError(checkError);
          }}
          hasClearBtn
        />
        <div className="flex flex-row justify-end gap-4 items-center w-full">
          <button
            className="py-4 px-6 bg-white text-black hover:text-white hover:bg-[#ABCAC1] rounded-full"
            onClick={() => {
              setError(false);
              setValue(0);
              setValueMasked("");
            }}
          >
            Reset
          </button>
          <button
            className="py-4 px-6 bg-[#3B6E5F] text-white hover:bg-[#3B6E5F]/50 rounded-full"
            onClick={() => {
              setError(value < min);
            }}
          >
            Submit
          </button>
          <button
            className="py-4 px-6 bg-[#419c81] text-white hover:bg-[#419c81]/80 rounded-full"
            onClick={copyValue}
          >
            {isCopied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </>
  );
}
