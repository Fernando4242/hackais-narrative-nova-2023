import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
export default function Layout({ children }) {
  return (
    <>
      <main className="flex flex-col min-h-screen text-white">
        <header className="flex flex-row items-center justify-between p-4 min-h-[10svh]">
          <Link href={"/"} className="flex justify-center items-center gap-4">
            <Image src="/logo.png" alt="logo for app" width={40} height={40} />
            <span href={"/"} className="text-2xl font-bold">
              Narrative Nova
            </span>
          </Link>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="flex flex-row items-center justify-between p-4 min-h-[10svh]">
          <p>
            Made by{" "}
            <span className="font-bold">
              Fernando & Hayden
            </span>{" "}
            - images are generated by{" "}
            <a href="https://stablediffusionweb.com/" className="text-blue-500">
              Stable Diffusion
            </a>{" "}
            & Storyline prompts by{" "}
            <a href="https://openai.com/blog/chatgpt" className="text-blue-500">
              ChatGPT
            </a>.
          </p>
        </footer>
      </main>
    </>
  );
}