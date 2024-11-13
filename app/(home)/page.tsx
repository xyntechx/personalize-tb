import Link from "next/link";
import clsx from "clsx";

import BioInput from "./BioInput";
import { tbList } from "../_utils/tb-list";

const Home = () => {
    return (
        <main className="w-screen min-h-screen flex items-center justify-center flex-col p-4">
            <h1 className="text-4xl font-bold text-center">
                Textbook Personalization
            </h1>

            <div className="flex items-center justify-center flex-col gap-y-2 w-full md:w-1/2 p-4">
                <BioInput />
            </div>

            <div className="flex items-center justify-center flex-col gap-y-2 w-full md:w-1/2 p-4">
                <p className="text-center font-bold">Textbook Choice</p>
                <div className="w-full grid grid-cols-3 gap-4">
                    {tbList.map((tb, i) => (
                        <Link
                            key={tb.tbid}
                            href={`/personalize/${tb.tbid}`}
                            className={clsx(
                                "w-full text-center px-4 py-2 rounded-md transition-colors border border-transparent hover:border-black",
                                {
                                    "bg-blue-500 hover:bg-blue-600":
                                        i % 3 === 0,
                                },
                                { "bg-red-500 hover:bg-red-600": i % 3 === 1 },
                                {
                                    "bg-green-500 hover:bg-green-600":
                                        i % 3 === 2,
                                }
                            )}
                        >
                            {tb.title}
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Home;
