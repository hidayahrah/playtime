import { Bungee } from "next/font/google";
import Image from "next/image";

export const pokemonFont = Bungee({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function Home() {
  const games = [
    {
      link: "/pokemon",
      targetLink: "_self",
      name: "Name Generator",
      logo: "/img/pokemonLogoWhite.png",
      bgImg: "/img/pokemonBG.png",
    },
    {
      link: "/currency-input",
      targetLink: "_self",
      name: "Currency Input",
      bgImg: "/img/money.png",
    },
    {
      link: "https://hidayahrah-dadjokes.netlify.app/",
      targetLink: "_blank",
      name: "Jokes",
      bgImg: "/img/Dad.png",
    },
    {
      link: "https://hidayahrah-notes.netlify.app/",
      targetLink: "_blank",
      name: "Google Keep (Clone)",
      logo: "/img/google.png",
      bgImg: "/img/noteBg.jpg",
    },
  ];

  return (
    <div className="flex flex-col justify-between items-center m-10 md:mx-28">
      <p className="text-[50px] font-bold py-2">Playground</p>
      <div className="bg-black grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-8">
        {games.map(({ link, targetLink, name, logo, bgImg }, i) => (
          <a
            key={i}
            style={{
              backgroundImage: `url(${bgImg})`,
            }}
            className="flex flex-col items-center rounded-xl bg-black border border-white/30 p-6 bg-no-repeat bg-center bg-cover"
            href={link}
            target={targetLink}
          >
            {logo && (
              <Image
                src={logo}
                width={0}
                height={0}
                sizes="100vh"
                unoptimized
                alt="Logo"
                className="w-auto h-auto cursor-pointer"
                priority
                loader={() => logo}
              />
            )}
            {name && (
              <p className={`${pokemonFont.className} text-xl`}>{name}</p>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
