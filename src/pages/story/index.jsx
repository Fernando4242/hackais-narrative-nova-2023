import Layout from "@/components/Layout";
import Canvas from "@/components/Canvas";
import axios from "axios";

import { useEffect, useState } from "react";

import Image from "next/image";
import Head from "next/head";
export default function Story() {
    const [scenes, setScenes] = useState([]);
    const [nextAction, setNextAction] = useState("");
    const [loading, setLoading] = useState(false);

    // get previous scenes from local storage
    useEffect(() => {
        // get local storage prev scences
        const prevScenes = JSON.parse(localStorage.getItem("nv-story-game-prevScenes"));
        if (prevScenes) {
            setScenes(prevScenes);
        }

    }, []);

    // save scenes and generate next one
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        const newScene = {
            prompt: nextAction,
            image: ""
        }

        var newScenesArr = [...scenes, newScene];

        // make api call
        axios.post("https://943b-129-110-241-55.ngrok-free.app/", {
            prompt_array: newScenesArr
        }).then((res) => {
            newScenesArr = [...newScenesArr, res.data];
            localStorage.setItem("nv-story-game-prevScenes", JSON.stringify(newScenesArr));
            setScenes(newScenesArr);
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
            setNextAction("");
        });
    };

    if (scenes.length === 0) {
        return (
            <>
                <Head>
                    <title>Narrative Nova - Story</title>
                    <meta
                        name="description"
                        content="scene and prompt for the current game"
                    />
                </Head>
                <Layout>
                    <Canvas>
                        {loading ? (
                            <div className="w-[400px]">
                                <h1 className="text-center text-2xl font-bold">Loading...</h1>
                            </div>
                        ) : (
                            <div className="w-[400px]">
                                {/* prompt */}
                                <div className="my-6 w-full">
                                    <h1 className="text-center text-2xl font-bold">Prompt</h1>
                                    <p className="text-center my-2">
                                        Write a description of your initial scene.
                                    </p>
                                </div>

                                {/* player input */}
                                <div className="my-6 w-full">
                                    <form onSubmit={handleSubmit}>
                                        <h1 className="text-center text-2xl font-bold">Action</h1>
                                        <input
                                            className="w-full p-2 my-2 rounded-md text-black"
                                            placeholder="Medieval castle in the middle of a forest."
                                            value={nextAction}
                                            onChange={(e) => setNextAction(e.target.value)}
                                            required
                                            maxLength={52}
                                        />
                                        <button className="bg-blue-700 hover:bg-blue-600 w-full py-2 text-white font-bold rounded">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </Canvas>
                </Layout>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Narrative Nova - Story</title>
                <meta
                    name="description"
                    content="scene and prompt for the current game"
                />
            </Head>
            <Layout>
                <Canvas>
                    {loading ? (
                        <div className="w-[400px]">
                            <h1 className="text-center text-2xl font-bold">Loading...</h1>
                        </div>
                    ) : (
                        <div className="w-[300px] md:w-[400px]">
                            <h1 className="text-center text-2xl font-bold">Scene</h1>
                            {/* image */}
                            <div className="relative my-6 w-full flex justify-center">
                                <Image
                                    src={"https://943b-129-110-241-55.ngrok-free.app/static/" + scenes[scenes.length - 1].image}
                                    alt="scene image"
                                    width={300}
                                    height={300}
                                    className="rounded-md drop-shadow-lg"
                                />
                            </div>

                            {/* prompt */}
                            <div className="my-6 w-full">
                                <h1 className="text-center text-2xl font-bold">Prompt</h1>
                                <p className="text-center text-lg my-2 bg-black/40 rounded-md py-2">
                                    {scenes[scenes.length - 1].prompt}
                                </p>
                            </div>

                            {/* player input */}
                            <div className="my-6 w-full">
                                <form onSubmit={handleSubmit}>
                                    <h1 className="text-center text-2xl font-bold">Next Action</h1>
                                    <input
                                        className="w-full p-2 my-2 rounded-md text-black"
                                        placeholder="Write your next action"
                                        value={nextAction}
                                        onChange={(e) => setNextAction(e.target.value)}
                                        required
                                        maxLength={52}
                                    />
                                    <button className="bg-blue-700 mt-2 hover:bg-blue-600 w-full py-2 text-white font-bold rounded">
                                        Send
                                    </button>
                                </form>
                                <button onClick={() => {
                                    localStorage.removeItem("nv-story-game-prevScenes");
                                    setScenes([]);
                                }} className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full mt-3">
                                    Reset your story
                                </button>
                            </div>
                        </div>
                    )}
                </Canvas>
            </Layout>
        </>
    );
}
