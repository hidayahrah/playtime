import { Inconsolata } from "next/font/google";

export const font = Inconsolata({
  subsets: ["latin"],
  display: "swap",
});

export default function Layout({ children }) {
  return (
    <div
      className={`relative flex items-center justify-center ${font.className}`}
    >
      <main className="overflow-auto h-screen w-full">{children}</main>
    </div>
  );
}
