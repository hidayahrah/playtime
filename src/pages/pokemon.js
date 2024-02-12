import Image from "next/image";
import { Bungee } from "next/font/google";
import { useState } from "react";
import CloseSVG from "@/components/icons/Close";
import TypingSVG from "@/components/icons/Typing";
import CopySVG from "@/components/icons/Copy";

export const font = Bungee({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function PokemonPage({ names }) {
  const [isOpen, setOpen] = useState(false);
  const [isCopied, setCopy] = useState(false);
  const [name, setName] = useState(names[0]);

  function copyName() {
    navigator.clipboard.writeText(name ? name.toString() : "");
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  }
  return (
    <>
      <div className="relative flex flex-col md:flex-row gap-10 items-center justify-center my-14">
        <div className="flex flex-col gap-8">
          <a className="flex flex-col gap-2 items-center" href="/">
            <Image
              src="/img/pokemonLogo.jpg"
              width={0}
              height={0}
              sizes="100vh"
              unoptimized
              alt="Pokemon Logo"
              className="w-full h-40 cursor-pointer"
              priority
              loader={() => "/img/pokemonLogo.jpg"}
            />
            <p className={`${font.className} text-3xl`}>Name Generator</p>
          </a>
          <button
            className="py-4 px-6 border-4 border-white bg-blue-600/80 hover:bg-blue-500 rounded-xl"
            onClick={() => setOpen(true)}
          >
            <p className="text-xl font-semibold">Start Now</p>
          </button>
        </div>

        <Image
          src="/img/pikachu.png"
          width={0}
          height={0}
          sizes="100vh"
          unoptimized
          alt="Pokemon Logo"
          className="w-auto h-fit"
          priority
        />

        {/* Modal */}
        <div
          className={`${
            isOpen ? "scale-100" : "scale-0"
          } transition-all duration-200 ease-in-out bg-no-repeat bg-center bg-cover bg-[url('/img/pokemonBG.png')] w-[350px] h-fit md:w-[900px] md:h-[500px] absolute top-0 rounded-2xl`}
        >
          <div className="flex items-end justify-end w-full p-6">
            <button
              className="rounded-full text-red-600 bg-white hover:bg-red-600 hover:text-white p-4"
              onClick={() => setOpen(false)}
            >
              <div className="w-6 h-6 fill-current">
                <CloseSVG />
              </div>
            </button>
          </div>
          <div className="flex flex-col items-center my-20 gap-4">
            <p
              className={`text-[30px] md:text-[50px] capitalize ${font.className}`}
            >
              {name}
            </p>
            <div className="flex flex-row gap-2 justify-center">
              <button
                className="py-4 px-6 flex flex-row gap-2 items-center border-4 border-white bg-blue-600/80 hover:bg-blue-500 rounded-xl"
                onClick={() => {
                  const randomNumber = Math.floor(
                    Math.random() * names?.length
                  );
                  setName(names[randomNumber]);
                }}
              >
                <div className="w-6 h-6 fill-current">
                  <TypingSVG />
                </div>
                <p className="text-xl font-semibold">Generate</p>
              </button>
              <button
                className="py-4 px-6 flex flex-row gap-2 items-center border-4 border-white bg-yellow-500 hover:bg-yellow-400 rounded-xl"
                onClick={copyName}
              >
                <div className="w-6 h-6 fill-current">
                  <CopySVG />
                </div>
                <p className="text-xl font-semibold">
                  {isCopied ? "Copied!" : "Copy"}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  let names = [];
  const res = await (
    await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1000")
  ).json();
  const { results } = res;
  results.map(({ name, url }, i) => names.push(name));
  return {
    props: {
      names,
    },
  };
}
