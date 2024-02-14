import { Roboto } from "next/font/google";
import { useState } from "react";
import Image from "next/image";
import { commentsOnPR } from "@/lib/commentsOnPR";

export const font = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function PullRequestCommentsPage() {
  const [isCopied, setCopy] = useState(false);
  const [comment, setComment] = useState(commentsOnPR[0]);

  function copyValue() {
    navigator.clipboard.writeText(comment ? comment : "");
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  }

  const apps = [
    "/img/mac-icons/applemusic.png",
    "/img/mac-icons/applestore.png",
    "/img/mac-icons/discord.png",
    "/img/mac-icons/facetime.png",
    "/img/mac-icons/mail.png",
    "/img/mac-icons/messages.png",
    "/img/mac-icons/photos.png",
    "/img/mac-icons/safari.png",
  ];

  return (
    <>
      <div
        className={`relative h-full md:px-40 pt-20 flex flex-col justify-between items-center bg-no-repeat bg-center bg-cover bg-[url('/img/github-photo.png')] ${font.className}`}
      >
        <div className="flex flex-col rounded-xl w-fit md:w-2/3">
          <div className="w-full flex flex-row items-center rounded-t-xl bg-white text-black font-semibold py-1 px-2">
            <div className="flex flex-row gap-2">
              <button className="p-2 rounded-full bg-[#ff635c]"></button>
              <button className="p-2 rounded-full bg-[#ffc030]"></button>
              <button className="p-2 rounded-full bg-[#28cd40]"></button>
            </div>
            <p className="w-full flex justify-center text-lg">
              Pull Request Comment
            </p>
          </div>
          <div className="p-8 bg-[#ececec] text-center text-black rounded-b-xl flex flex-col gap-6 items-center justify-center">
            {comment}
            <div className="flex flex-row gap-2">
              <button
                className="px-3 py-2 text-md rounded-2xl text-white bg-[#007aff] hover:bg-[#007aff]/80 drop-shadow-md"
                onClick={() => {
                  const randomNumber = Math.floor(
                    Math.random() * commentsOnPR?.length
                  );
                  setComment(commentsOnPR[randomNumber]);
                }}
              >
                Refresh
              </button>
              <button
                className="px-3 py-2 text-md rounded-2xl text-[#007aff] bg-white hover:text-[#007aff]/70 border border-[#007aff] drop-shadow-md"
                onClick={copyValue}
              >
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
        <div className="px-2 pt-2 pb-3 backdrop-blur-md bg-white/20 rounded-xl">
          <div className="md:flex hidden flex-row gap-4">
            {apps.map((icon, i) => (
              <Image
                key={i}
                src={icon}
                width={0}
                height={0}
                sizes="100vh"
                unoptimized
                alt="Icon"
                className="w-auto h-12"
                priority
                loader={() => icon}
              />
            ))}
          </div>

          <div className="md:hidden flex flex-row justify-between gap-4">
            {apps.map((icon, i) => {
              if (i < 4) {
                return (
                  <Image
                    key={i}
                    src={icon}
                    width={0}
                    height={0}
                    sizes="100vh"
                    unoptimized
                    alt="Icon"
                    className="w-auto h-12"
                    priority
                    loader={() => icon}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}
