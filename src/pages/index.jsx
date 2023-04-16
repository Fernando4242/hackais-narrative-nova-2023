import Image from "next/image";
import Head from "next/head";
import Router from "next/router";

// import components
import Layout from "../components/Layout";
import Button from "../components/Button";

export default function Home() {
  const router = Router;
  return (
    <Layout>
      <Head>
        <title>Narrative Nova</title>
        <meta name="description" content="Narrative Nova allows you to create a story like a game." />
      </Head>
      <div className="flex flex-col items-center justify-center w-full h-[80svh] px-6 text-center overflow-hidden">
        <div className="w-full flex justify-center gap-12">
          {/* simple image one to grab attention */}
          <Image
            src="/example1.jpeg"
            alt="Storytelling"
            width={250}
            height={250}
            className="rounded-lg drop-shadow-lg border border-black"
          />

          {/* simple image two to grab attention */}
          <Image
            src="/example2.jpeg"
            alt="Storytelling"
            width={250}
            height={250}
            className="rounded-lg drop-shadow-lg border border-black"
          />
        </div>

        <div className="pt-10">
          <h1 className="text-4xl font-bold my-3">Welcome to Narrative Nova</h1>
          <p className="text-lg leading-6 my-3 w-[400px] md:w-[600px]">
            <span className="font-extrabold">Narrative Nova</span> is a unique and engaging story-based game app that lets
            you create your own narrative by making your own decisions.
          </p>
          <Button
            type="primary"
            className="my-3"
            onClick={() => {
              router.push("/story");
            }}
          >
            Create your own story
          </Button>
        </div>
      </div>
    </Layout>
  );
}
