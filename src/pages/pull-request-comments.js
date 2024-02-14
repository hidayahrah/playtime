import { Bungee } from "next/font/google";
import { useState } from "react";
import { CurrencyCode } from "@/lib/currencyCode";
import Image from "next/image";

export const font = Bungee({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function PullRequestCommentsPage() {
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
      <div className="relative h-full flex flex-row justify-end gap-4 items-center w-full bg-no-repeat bg-center bg-cover bg-[url('/img/github-photo.png')]">
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
    </>
  );
}
