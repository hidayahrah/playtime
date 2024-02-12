import { Inconsolata } from "next/font/google";
import LoveSVG from "./icons/Love";

export const font = Inconsolata({
  subsets: ["latin"],
  display: "swap",
});

export default function Layout({ children }) {
  const currYear = new Date().getFullYear();
  return (
    <div className={`${font.className}`}>
      <main className="relative overflow-auto h-screen w-full">
        {children}
        <footer className="m-8 md:my-10 md:mx-24 flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-row gap-2 items-center justify-center">
            Made with{" "}
            <span className="animate-bounce w-4 h-4">
              <LoveSVG />
            </span>
            by hidayahrah. © {currYear} All rights reserved.
          </div>
          <a href="https://github.com/hidayahrah">GitHub</a>
        </footer>
      </main>
    </div>
  );
}
